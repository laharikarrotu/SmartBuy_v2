/**
 * NavAssistant Tool Declarations
 * This file contains the tool declarations used by the NavAssistant component.
 */
import { type Tool, SchemaType } from "@google/generative-ai";

// System instruction for the NavAssistant
export const systemInstructionObject = {
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
       - Main categories: all, clothing, electronics, dog, cat, pets
       - Subcategories for clothing: mens, womens, accessories, hats, shirts, jeans, dresses
       - Subcategories for electronics: smartphones, laptops, accessories
       - Subcategories for pets: dog, cat, supplies
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

// Tool declarations for the NavAssistant
export const toolObject: Tool[] = [{
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
          category: {
            type: SchemaType.STRING,
            description: "The category of the product",
            enum: ["dog", "cat", "clothing", "electronics"]
          },
          quantity: {
            type: SchemaType.INTEGER,
            description: "The quantity to add to cart"
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
            description: "Optional category to filter results",
            enum: ["dog", "cat", "clothing", "electronics", "all"]
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
      description: "Get information about a specific product",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          productId: {
            type: SchemaType.STRING,
            description: "The ID of the product to get information for"
          },
          response: {
            type: SchemaType.STRING,
            description: "The product information response"
          }
        },
        required: ["productId"]
      }
    }
  ]
}];

export default {
  systemInstructionObject,
  toolObject
}; 