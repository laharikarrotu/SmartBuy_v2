/**
 * Copyright 2024 Google LLC
 * Licensed under the Apache License, Version 2.0
 */
import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { useCart, CartItem } from '../../contexts/CartContext';
import { type Tool, SchemaType } from "@google/generative-ai";
import './NavAssistant.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'clothing' | 'electronics' | 'dog' | 'cat';
  description: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  tag?: string;
  type?: string;
  colors?: string[];
  sizes?: string[];
  shipping?: string;
}

interface FunctionCall {
  name: string;
  args?: {
    route?: string;
    productId?: string;
    fit?: string;
    size?: string;
    method?: string;
    action?: string;
    category?: string;
    isRewardsMember?: boolean;
    name?: string;
    field?: string;
    value?: string;
    phoneNumber?: string;
    code?: string;
    inseam?: string;
  };
}

const systemInstructionObject = {
  parts: [{
    text: `You are a helpful SmartBuy shopping assistant with deep knowledge of all products and categories. You can understand natural language requests and provide relevant responses.

    Key Capabilities:
    1. Product Navigation
       - Show all products in a category (e.g., "Show me all dog food")
       - Navigate to specific products (e.g., "Show me Purina Pro Plan dog food")
       - Compare products (e.g., "Compare different dog food brands")
       - Show product details (e.g., "Tell me about this dog food")
       - Handle product-specific queries (e.g., "What are the reviews for this item?")

    2. Category Navigation
       - Main categories: all, clothing, electronics, dog
       - Subcategories: deals, new arrivals, best sellers
       - Special sections: sales, promotions, bundles

    3. Shopping Features
       - Cart management: add items, view cart, remove items
       - Product recommendations based on user preferences
       - Price comparisons and deals
       - Size and variant selection
       - Handle quantity selection
       - Process checkout steps

    4. Natural Language Understanding
       - Understand various ways users might ask for the same thing
       - Handle follow-up questions and clarifications
       - Provide context-aware responses
       - Suggest related products or alternatives
       - Process product-specific queries

    Response Guidelines:
    1. Always confirm what you understood from the user's request
    2. Provide clear, concise responses
    3. When showing products, explain key features and benefits
    4. Offer relevant suggestions or alternatives
    5. Ask for clarification if the request is unclear
    6. Use friendly, conversational language
    7. Provide context about prices, reviews, and availability
    8. Guide users through product selection and cart process

    Example Interactions:
    User: "Show me dog food"
    Assistant: "I'll show you all available dog food products. You can browse through different brands and types. Would you like to see specific brands or price ranges?"

    User: "Tell me about Purina Pro Plan"
    Assistant: "I'll show you details about Purina Pro Plan dog food. It's a premium brand with various formulas for different needs. Let me show you the available options."

    User: "What's the best dog food?"
    Assistant: "I can help you find the best dog food based on your needs. Let me show you our top-rated options, and I can explain the benefits of each one."

    User: "Add this to my cart"
    Assistant: "I'll help you add this item to your cart. Would you like to select a specific size or quantity?"

    User: "Show me my cart"
    Assistant: "I'll take you to your shopping cart where you can review your items and proceed to checkout."

    Remember to:
    - Always show category listings first unless specifically asked for a product
    - Provide clear navigation options
    - Include relevant product information
    - Handle follow-up questions naturally
    - Suggest related items when appropriate
    - Guide users through the cart and checkout process
    - Confirm actions and provide clear next steps`
  }]
};

const toolObject: Tool[] = [{
  functionDeclarations: [
    {
      name: "navigate",
      description: "Navigate to any page or product in the store",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          route: {
            type: SchemaType.STRING,
            description: "The route to navigate to",
            enum: [
              "/",
              "/search",
              "/compare",
              "/instore",
              "/cart",
              "/profile",
              "/personalized",
              "/personalized/:id",
              "/clothing",
              "/clothing/mens",
              "/clothing/womens",
              "/clothing/accessories",
              "/clothing/hats",
              "/clothing/shirts",
              "/clothing/jeans",
              "/clothing/dresses",
              "/electronics",
              "/electronics/smartphones",
              "/electronics/laptops",
              "/electronics/accessories",
              "/pets",
              "/pets/dog",
              "/pets/cat",
              "/pets/supplies"
            ]
          },
          category: {
            type: SchemaType.STRING,
            description: "The category to show products from",
            enum: [
              "dog",
              "cat",
              "clothing",
              "electronics",
              "personalized"
            ]
          },
          productId: {
            type: SchemaType.STRING,
            description: "The ID of the specific product to navigate to"
          },
          response: {
            type: SchemaType.STRING,
            description: "A friendly response to confirm the navigation"
          }
        },
        required: ["route"]
      }
    },
    {
      name: "addToCart",
      description: "Add an item to the shopping cart",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          productId: {
            type: SchemaType.STRING,
            description: "The ID of the product to add"
          },
          name: {
            type: SchemaType.STRING,
            description: "The name of the product"
          },
          price: {
            type: SchemaType.NUMBER,
            description: "The price of the product"
          },
          image: {
            type: SchemaType.STRING,
            description: "The image URL of the product"
          },
          quantity: {
            type: SchemaType.NUMBER,
            description: "The quantity to add to cart"
          },
          size: {
            type: SchemaType.STRING,
            description: "The selected size if applicable"
          },
          response: {
            type: SchemaType.STRING,
            description: "A friendly response to confirm the item was added to cart"
          }
        },
        required: ["productId", "name", "price", "image"]
      }
    },
    {
      name: "viewCart",
      description: "View the shopping cart",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          response: {
            type: SchemaType.STRING,
            description: "A friendly response about the cart contents"
          }
        }
      }
    },
    {
      name: "search",
      description: "Search for products or categories",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          query: {
            type: SchemaType.STRING,
            description: "The search query"
          },
          category: {
            type: SchemaType.STRING,
            description: "Optional category to filter results"
          },
          response: {
            type: SchemaType.STRING,
            description: "A friendly response about the search results"
          }
        },
        required: ["query"]
      }
    },
    {
      name: "compareProducts",
      description: "Compare multiple products",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          productIds: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING
            },
            description: "Array of product IDs to compare"
          },
          response: {
            type: SchemaType.STRING,
            description: "A friendly response about the comparison"
          }
        },
        required: ["productIds"]
      }
    }
  ]
}];

// Product data for better navigation and cart functionality
const products: Record<string, Product[]> = {
  dog: [
    {
      id: "1",
      name: "Purina Pro Plan",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "dog",
      description: "Premium dog food with high-quality protein",
      inStock: true,
      brand: "Purina",
      rating: 4.5,
      reviews: 1200,
      features: ["High-quality protein", "Optimal health"],
      specifications: {
        formula: "Pro Plan",
        nutrition: "Complete and balanced"
      }
    },
    {
      id: "2",
      name: "Royal Canin",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "dog",
      description: "Veterinary diet for optimal health",
      inStock: true,
      brand: "Royal Canin",
      rating: 4.2,
      reviews: 800,
      features: ["Veterinary diet", "Optimal health"],
      specifications: {
        formula: "Veterinary",
        nutrition: "Complete and balanced"
      }
    }
  ],
  clothing: [
    {
      id: "1",
      name: "Classic T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "clothing",
      description: "Comfortable cotton t-shirt",
      inStock: true,
      brand: "Classic T-Shirt Co.",
      rating: 4.7,
      reviews: 2000,
      features: ["Comfortable", "Cotton"],
      specifications: {
        material: "100% cotton",
        size: "M"
      },
      tag: "Best Seller"
    },
    {
      id: "2",
      name: "Denim Jeans",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "clothing",
      description: "Classic fit denim jeans",
      inStock: true,
      brand: "Classic Jeans",
      rating: 4.6,
      reviews: 1800,
      features: ["Classic fit", "Denim"],
      specifications: {
        material: "100% cotton",
        size: "32"
      },
      tag: "Best Seller"
    }
  ],
  electronics: [
    {
      id: "1",
      name: "Smartphone Pro Max",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "electronics",
      description: "Latest smartphone with advanced features",
      inStock: true,
      brand: "ProMax",
      rating: 4.8,
      reviews: 3000,
      features: ["Advanced features", "Latest technology"],
      specifications: {
        model: "Pro Max 2024",
        storage: "256GB",
        camera: "48MP + 12MP dual camera"
      }
    },
    {
      id: "2",
      name: "Wireless Headphones",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "electronics",
      description: "Premium wireless headphones with noise cancellation",
      inStock: true,
      brand: "ProSound",
      rating: 4.7,
      reviews: 2500,
      features: ["Noise cancellation", "High-quality sound"],
      specifications: {
        model: "Pro Sound 2024",
        batteryLife: "20 hours",
        noiseCancellation: "Active"
      }
    }
  ]
};

const NavAssistantComponent = () => {
  const { client, setConfig, connected } = useLiveAPIContext();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  // Set up initial config
  useEffect(() => {
    setConfig({
      model: "models/gemini-2.0-flash-exp",
      tools: toolObject,
      systemInstruction: {
        ...systemInstructionObject,
        parts: [
          {
            text: `${systemInstructionObject.parts[0].text}

            Available Products:
            ${Object.entries(products).map(([category, items]) => `
            ${category.charAt(0).toUpperCase() + category.slice(1)}:
            ${items.map(item => `- ${item.name} (ID: ${item.id}, Price: $${item.price})`).join('\n')}
            `).join('\n')}`
          }
        ]
      },
      generationConfig: {
        responseModalities: "audio",
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Aoede"
            }
          }
        }
      }
    });
  }, [setConfig]);

  // Handle speech recognition
  useEffect(() => {
    if (!client) return;

    const handleStart = () => {
      setIsListening(true);
    };

    const handleEnd = () => {
      setIsListening(false);
    };

    const handleInterrupt = () => {
      setIsListening(false);
    };

    client.on("toolcall", handleStart);
    client.on("turncomplete", handleEnd);
    client.on("interrupted", handleInterrupt);

    return () => {
      client.off("toolcall", handleStart);
      client.off("turncomplete", handleEnd);
      client.off("interrupted", handleInterrupt);
    };
  }, [client]);

  // Handle rewards prompt
  useEffect(() => {
    const handleRewardsPrompt = (event: Event) => {
      if (connected && client && event.type === 'rewardsPromptFade') {
        client.send([{
          text: "Are you a rewards member?"
        }]);
      }
    };

    document.addEventListener('rewardsPromptFade', handleRewardsPrompt);
    return () => document.removeEventListener('rewardsPromptFade', handleRewardsPrompt);
  }, [client, connected]);

  // Handle tool calls
  useEffect(() => {
    if (!client) return undefined;

    const handleToolCall = (toolCall: { functionCalls: any[] }) => {
      toolCall.functionCalls.forEach(async (fCall: any) => {
        try {
          switch (fCall.name) {
            case "navigate":
              if (fCall.args?.route) {
                let route = fCall.args.route;
                if (fCall.args?.productId) {
                  // Handle category-specific product routes
                  if (fCall.args?.category) {
                    if (fCall.args.category === 'personalized') {
                      route = `/personalized/${fCall.args.productId}`;
                    } else {
                      route = `/${fCall.args.category}/${fCall.args.productId}`;
                    }
                  } else {
                    // Try to find the product in our data
                    const product = Object.values(products)
                      .flat()
                      .find(p => p.id === fCall.args.productId);
                    
                    if (product) {
                      route = `/${product.category}/${product.id}`;
                    }
                  }
                }
                
                navigate(route);
                
                if (fCall.args?.response) {
                  client.send([{ text: fCall.args.response }]);
                }
              }
              break;

            case "addToCart":
              try {
                // Find the add to cart button based on the current page
                const location = window.location.pathname;
                let addToCartButton: HTMLButtonElement | null = null;

                if (location.includes('/personalized/')) {
                  // For personalized product pages
                  addToCartButton = document.querySelector('.add-to-cart-btn') as HTMLButtonElement;
                } else if (location.match(/\/[^/]+\/[^/]+/)) {
                  // For regular product pages with category/id pattern
                  addToCartButton = document.querySelector('.add-to-cart-btn') as HTMLButtonElement;
                } else if (location.includes('/all') || location.includes('/clothing') || 
                           location.includes('/electronics') || location.includes('/dog')) {
                  // For category pages, find the first product's add to cart button
                  const productCard = document.querySelector('.product-card') as HTMLElement;
                  if (productCard) {
                    addToCartButton = productCard.querySelector('.add-to-cart-btn') as HTMLButtonElement;
                  }
                }

                if (addToCartButton) {
                  addToCartButton.click();
                  // Send confirmation response
                  if (fCall.args?.response) {
                    client.send([{ text: fCall.args.response }]);
                  } else {
                    client.send([{ text: "I've added that item to your cart!" }]);
                  }
                } else {
                  client.send([{ text: "I couldn't find the add to cart button. Please make sure you're on a product page." }]);
                }
              } catch (error) {
                console.error('Add to cart error:', error);
                client.send([{ text: "I apologize, but I couldn't add the item to your cart. Could you please try again?" }]);
              }
              break;

            case "viewCart":
              navigate('/cart');
              if (fCall.args?.response) {
                client.send([{ text: fCall.args.response }]);
              }
              break;

            case "search":
              if (fCall.args?.query) {
                navigate('/search', {
                  state: {
                    query: fCall.args.query,
                    category: fCall.args?.category
                  }
                });
                
                if (fCall.args?.response) {
                  client.send([{ text: fCall.args.response }]);
                }
              }
              break;

            case "compareProducts":
              if (fCall.args?.productIds?.length > 0) {
                navigate('/compare', {
                  state: {
                    productIds: fCall.args.productIds
                  }
                });
                
                if (fCall.args?.response) {
                  client.send([{ text: fCall.args.response }]);
                }
              }
              break;
          }
        } catch (error) {
          console.error('Error handling tool call:', error);
          client.send([{ 
            text: "I apologize, but I encountered an error. Could you please try again or rephrase your request?" 
          }]);
        }
      });
    };

    client.on("toolcall", handleToolCall);
    return () => {
      client.off("toolcall", handleToolCall);
    };
  }, [client, navigate, addToCart]);

  return (
    <div className="nav-assistant">
      <button 
        className={`nav-assistant__button ${isListening ? 'nav-assistant__button--listening' : ''}`}
        onClick={() => {
          if (isListening) {
            client?.send([{ text: "Stop listening" }]);
          } else {
            client?.send([{ text: "Start listening" }]);
          }
        }}
      >
        {isListening ? '🎤' : '🎯'}
      </button>
    </div>
  );
};

export const NavAssistant = memo(NavAssistantComponent); 