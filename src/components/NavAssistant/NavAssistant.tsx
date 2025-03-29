/**
 * Copyright 2024 Google LLC
 * Licensed under the Apache License, Version 2.0
 */
import React, { memo, useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { useCart, CartItem } from '../../contexts/CartContext';
import { type Tool, SchemaType } from "@google/generative-ai";
import { useApp } from '../../contexts/AppContext';
import './NavAssistant.scss';
import { products as allProducts } from '../../data/products';

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

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
    },
    {
      name: "getProductInfo",
      description: "Get detailed information about a product",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          productId: {
            type: SchemaType.STRING,
            description: "The ID of the product to get information about"
          },
          response: {
            type: SchemaType.STRING,
            description: "A friendly response about the product information"
          }
        },
        required: ["productId"]
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
  const location = useLocation();
  const { isNavAssistantOpen, toggleNavAssistant } = useApp();
  
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your SmartBuy shopping assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isNavAssistantOpen]);

  // Focus input field when chat is opened
  useEffect(() => {
    if (isNavAssistantOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isNavAssistantOpen]);

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

  // Handle speech recognition and status
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

    // Custom event handlers for speech events 
    const handleSpeechStart = () => {
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      setIsSpeaking(false);
    };

    // Standard events from the MultimodalLiveClientEventTypes interface
    client.on("toolcall", handleStart);
    client.on("turncomplete", handleEnd);
    client.on("interrupted", handleInterrupt);
    
    // Now these events are properly typed in the interface
    client.on("speechstart", handleSpeechStart);
    client.on("speechend", handleSpeechEnd);

    return () => {
      client.off("toolcall", handleStart);
      client.off("turncomplete", handleEnd);
      client.off("interrupted", handleInterrupt);
      
      // Remove custom events
      client.off("speechstart", handleSpeechStart);
      client.off("speechend", handleSpeechEnd);
    };
  }, [client]);

  // Handle rewards prompt
  useEffect(() => {
    const handleRewardsPrompt = (event: Event) => {
      if (connected && client && event.type === 'rewardsPromptFade') {
        client.send([{
          text: "Are you a rewards member?"
        }]);
        
        // Add a new message to the chat
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: "I notice you're viewing a product. Are you a rewards member? You could save 20% on your purchase today!",
            timestamp: new Date()
          }
        ]);
        
        // Open the chat panel
        if (!isNavAssistantOpen) {
          toggleNavAssistant();
        }
      }
    };

    document.addEventListener('rewardsPromptFade', handleRewardsPrompt);
    return () => document.removeEventListener('rewardsPromptFade', handleRewardsPrompt);
  }, [client, connected, isNavAssistantOpen, toggleNavAssistant]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A to toggle the assistant
      if (e.altKey && e.key === 'a') {
        toggleNavAssistant();
      }
      
      // Escape to close the assistant if it's open
      if (e.key === 'Escape' && isNavAssistantOpen) {
        toggleNavAssistant();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNavAssistantOpen, toggleNavAssistant]);

  // Handle client responses for chat
  useEffect(() => {
    if (!client) return;
    
    const handleResponse = (response: { text: string }) => {
      if (response.text) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: response.text,
            timestamp: new Date()
          }
        ]);
      }
    };
    
    // Now properly typed
    client.on('response', handleResponse);
    
    return () => {
      client.off('response', handleResponse);
    };
  }, [client]);

  // Helper function to find product by ID pattern or name
  const findProductInCategory = (productId: string, productName?: string): { category: string, id: string } | null => {
    console.log(`Searching for product: ${productId}, name: ${productName || 'not provided'}`);
    
    // First, try to find the product directly in allProducts
    for (const [category, categoryProducts] of Object.entries(allProducts)) {
      const product = categoryProducts.find(p => 
        p.id === productId || 
        (productName && p.name.toLowerCase().includes(productName.toLowerCase()))
      );
      
      if (product) {
        console.log(`Found product directly in allProducts: ${product.name} in ${category}`);
        return { 
          category: product.category, 
          id: product.id 
        };
      }
    }
    
    // Helper to check if ID matches common patterns
    const matchesCategoryPattern = (id: string) => {
      // Check for electronics patterns
      if (id.includes('iphone') || id.includes('samsung') || 
          id.includes('pixel') || id.includes('oneplus') ||
          id.includes('smartphone') || id.includes('laptop')) {
        return 'electronics';
      }
      
      // Check for clothing patterns
      if (id.includes('jeans') || id.includes('shirt') || 
          id.includes('dress') || id.includes('hat') ||
          id.includes('clothing')) {
        return 'clothing';
      }
      
      // Check for pet products patterns
      if (id.startsWith('d') || id.includes('dog') || 
          id.includes('purina') || id.includes('kong')) {
        return 'pets/dog';
      }
      
      if (id.startsWith('c') || id.includes('cat')) {
        return 'pets/cat';
      }
      
      return null;
    };
    
    // First try to match by simple pattern
    const categoryMatch = matchesCategoryPattern(productId.toLowerCase());
    if (categoryMatch) {
      console.log(`Found category match by pattern: ${categoryMatch}`);
      return { category: categoryMatch, id: productId };
    }
    
    // Try to look up known product IDs
    // This could be enhanced to search through all product data in your app
    const knownProducts: Record<string, { category: string, id: string }> = {
      // Electronics
      'iphone-15-pro': { category: 'electronics', id: 'iphone-15-pro' },
      'samsung-galaxy-s24': { category: 'electronics', id: 'samsung-galaxy-s24' },
      'google-pixel-8': { category: 'electronics', id: 'google-pixel-8' },
      'oneplus-12': { category: 'electronics', id: 'oneplus-12' },
      
      // Clothing
      'slim-jeans': { category: 'clothing', id: 'slim-jeans' },
      'straight-jeans': { category: 'clothing', id: 'straight-jeans' },
      'relaxed-jeans': { category: 'clothing', id: 'relaxed-jeans' },
      'skinny-jeans-women': { category: 'clothing', id: 'skinny-jeans-women' },
      
      // Dog products
      'd1': { category: 'pets/dog', id: 'd1' },
      'd2': { category: 'pets/dog', id: 'd2' },
      'd3': { category: 'pets/dog', id: 'd3' },
      'd4': { category: 'pets/dog', id: 'd4' },
      
      // Add more known product IDs as needed
    };
    
    if (knownProducts[productId]) {
      console.log(`Found product in known products map: ${productId}`);
      return knownProducts[productId];
    }
    
    // If we have a product name, try to do a fuzzy search on it
    if (productName) {
      const lowerName = productName.toLowerCase();
      
      // Check for common product names
      if (lowerName.includes('iphone') || lowerName.includes('samsung') || 
          lowerName.includes('pixel') || lowerName.includes('oneplus')) {
        console.log(`Found by product name match (electronics): ${productName}`);
        return { category: 'electronics', id: productId };
      }
      
      if (lowerName.includes('jeans') || lowerName.includes('shirt') || 
          lowerName.includes('dress') || lowerName.includes('hat')) {
        console.log(`Found by product name match (clothing): ${productName}`);
        return { category: 'clothing', id: productId };
      }
      
      if (lowerName.includes('dog') || lowerName.includes('purina') || 
          lowerName.includes('kong')) {
        console.log(`Found by product name match (pets/dog): ${productName}`);
        return { category: 'pets/dog', id: productId };
      }
    }
    
    // If all else fails, default to electronics as a fallback
    console.log(`No specific match found, defaulting to electronics category`);
    return { category: 'electronics', id: productId };
  };

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
                
                // Special handling for product navigation
                if (fCall.args?.productId) {
                  const productId = fCall.args.productId;
                  let category = fCall.args?.category;
                  const productName = fCall.args?.name;
                  
                  console.log(`Navigating to product: ${productId} in category: ${category}, name: ${productName || 'not provided'}`);
                  
                  // If category is not provided, try to find it
                  if (!category) {
                    const productInfo = findProductInCategory(productId, productName);
                    if (productInfo) {
                      category = productInfo.category;
                    }
                  }
                  
                  // Create the correct route based on category
                  if (category === 'personalized') {
                    route = `/personalized/${productId}`;
                  } else if (category?.includes('/')) {
                    // For nested paths like 'pets/dog'
                    route = `/${category}/${productId}`;
                  } else {
                    route = `/${category || 'electronics'}/${productId}`;
                  }
                  
                  console.log(`Resolved route: ${route}`);
                }
                
                // Log the final route for debugging
                console.log(`Navigating to: ${route}`);
                navigate(route);
                
                if (fCall.args?.response) {
                  client.send([{ text: fCall.args.response }]);
                }
              }
              break;

            case "addToCart":
              try {
                // First check if we have product details in the args
                if (fCall.args?.productId && fCall.args?.name && fCall.args?.price && fCall.args?.image) {
                  // Add directly to cart with provided details
                  const cartItem: CartItem = {
                    id: fCall.args.productId,
                    name: fCall.args.name,
                    price: fCall.args.price,
                    image: fCall.args.image,
                    quantity: fCall.args.quantity || 1,
                    category: fCall.args.category || 'electronics',
                    description: fCall.args.description || fCall.args.name,
                    inStock: true
                  };
                  
                  addToCart(cartItem);
                  
                  // Send confirmation
                  if (fCall.args?.response) {
                    client.send([{ text: fCall.args.response }]);
                  } else {
                    client.send([{ text: `I've added ${cartItem.name} to your cart!` }]);
                  }
                  
                  return;
                }
                
                // Fallback to finding the add to cart button based on the current page
                const location = window.location.pathname;
                let addToCartButton: HTMLButtonElement | null = null;

                if (location.includes('/personalized/')) {
                  // For personalized product pages
                  addToCartButton = document.querySelector('.add-to-cart-btn') as HTMLButtonElement;
                } else if (location.match(/\/[^/]+\/[^/]+/)) {
                  // For regular product pages with category/id pattern
                  addToCartButton = document.querySelector('.add-to-cart-btn') as HTMLButtonElement;
                } else if (location.includes('/all') || location.includes('/clothing') || 
                           location.includes('/electronics') || location.includes('/pets')) {
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

            case "getProductInfo":
              try {
                if (fCall.args?.productId) {
                  const productId = fCall.args.productId;
                  
                  // First try to find the product using the product helpers
                  let foundProduct = undefined;
                  
                  // Search in all categories of allProducts
                  for (const categoryProducts of Object.values(allProducts)) {
                    const product = categoryProducts.find(p => p.id === productId);
                    if (product) {
                      foundProduct = product;
                      break;
                    }
                  }
                  
                  if (foundProduct) {
                    // Send back the product info
                    const response = fCall.args?.response || 
                      `I found ${foundProduct.name}. It costs $${foundProduct.price} and has a rating of ${foundProduct.rating}/5 from ${foundProduct.reviews} reviews.`;
                    
                    client.send([{ text: response }]);
                  } else {
                    // Try to use the findProductInCategory function to see if we can identify where the product should be
                    const productInfo = findProductInCategory(productId);
                    if (productInfo) {
                      client.send([{ 
                        text: `I found that product ID ${productId} should be in the ${productInfo.category} category, but I don't have its full details. Would you like to navigate to see more?` 
                      }]);
                    } else {
                      client.send([{ 
                        text: "I'm sorry, I couldn't find detailed information about that product. Would you like to browse similar products instead?" 
                      }]);
                    }
                  }
                }
              } catch (error) {
                console.error('Error handling getProductInfo:', error);
                client.send([{ 
                  text: "I apologize, but I encountered an error retrieving product information. Could you try again with a different product?" 
                }]);
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

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: inputValue,
        timestamp: new Date()
      }
    ]);
    
    // Send message to API
    if (client) {
      client.send([{ text: inputValue }]);
    }
    
    // Clear input
    setInputValue('');
  };

  const handleVoiceInput = () => {
    if (isListening) {
      client?.send([{ text: "Stop listening" }]);
    } else {
      client?.send([{ text: "Start listening" }]);
      
      // Add a message showing that the assistant is listening
      if (!isListening) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: "I'm listening... What can I help you with?",
            timestamp: new Date()
          }
        ]);
      }
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hi! I\'m your SmartBuy shopping assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getContextBasedSuggestions = () => {
    // Return relevant suggestions based on current page
    if (location.pathname.includes('/pets/dog')) {
      return [
        "What dog food do you recommend?",
        "Show me dog toys",
        "Do you have any dog treats on sale?"
      ];
    } else if (location.pathname.includes('/clothing')) {
      return [
        "Show me the latest styles",
        "Do you have jeans in different sizes?",
        "What's trending in fashion?"
      ];
    } else if (location.pathname.includes('/electronics')) {
      return [
        "What's your best smartphone?",
        "Compare laptop models",
        "Show me headphones under $200"
      ];
    } else if (location.pathname.includes('/cart')) {
      return [
        "Apply a discount code",
        "What's your shipping policy?",
        "How long will delivery take?"
      ];
    } else {
      return [
        "What's on sale today?",
        "Show me popular products",
        "Help me find a gift"
      ];
    }
  };

  return (
    <>
      {/* Floating button */}
      <div className="nav-assistant">
        <button 
          className={`nav-assistant__button ${isListening ? 'nav-assistant__button--listening' : ''} ${isSpeaking ? 'nav-assistant__button--speaking' : ''}`}
          onClick={toggleNavAssistant}
          aria-label="Open shopping assistant"
          title="Open shopping assistant (Alt+A)"
        >
          <span className="nav-assistant__icon">💬</span>
        </button>
      </div>

      {/* Chat Panel */}
      <div className={`nav-assistant-panel ${isNavAssistantOpen ? 'open' : ''}`}>
        <div className="nav-assistant-panel__header">
          <h2>Shopping Assistant</h2>
          <div className="nav-assistant-panel__actions">
            <button 
              className="nav-assistant-panel__action-btn" 
              onClick={handleClearChat}
              title="Clear chat"
            >
              <span>🗑️</span>
            </button>
            <button 
              className="nav-assistant-panel__action-btn"
              onClick={toggleNavAssistant}
              title="Close assistant (Esc)"
            >
              <span>✕</span>
            </button>
          </div>
        </div>
        
        <div className="nav-assistant-panel__messages">
          {messages.map((message, index) => (
            <div key={index} className={`nav-assistant-panel__message ${message.role}`}>
              <div className="nav-assistant-panel__message-content">
                {message.content}
              </div>
              <div className="nav-assistant-panel__message-time">
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="nav-assistant-panel__suggestions">
          {getContextBasedSuggestions().map((suggestion, index) => (
            <button 
              key={index} 
              className="nav-assistant-panel__suggestion-btn"
              onClick={() => {
                setInputValue(suggestion);
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        <form className="nav-assistant-panel__input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="nav-assistant-panel__input"
            placeholder="Ask me anything about products..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
          <button 
            type="button"
            className={`nav-assistant-panel__voice-btn ${isListening ? 'listening' : ''}`}
            onClick={handleVoiceInput}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            <span>{isListening ? '🎤' : '🎙️'}</span>
          </button>
          <button 
            type="submit" 
            className="nav-assistant-panel__send-btn"
            disabled={!inputValue.trim()}
            title="Send message"
          >
            <span>➤</span>
          </button>
        </form>
      </div>
    </>
  );
};

export const NavAssistant = memo(NavAssistantComponent); 