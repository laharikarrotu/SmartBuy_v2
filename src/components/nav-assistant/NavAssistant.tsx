/**
 * Copyright 2024 Google LLC
 * Licensed under the Apache License, Version 2.0
 */
import { memo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { type Tool, SchemaType } from "@google/generative-ai";

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
    text: `You are a helpful SmartBuy shopping assistant. You can navigate to any product or category in the store through voice commands.

    Available Navigation:
    1. Main Categories
       - "Take me to all products" → "/all"
       - "Show me clothing" → "/clothing"
       - "Go to electronics" → "/electronics"
       - "Show me pet supplies" → "/dog"

    2. Specific Products
       - "Show me baby boot jeans" → "/baby-boot-jean"
       - "Take me to modern rib pullover" → "/modern-rib-pullover"
       - "Show me straw panama hat" → "/straw-panama-hat"
       - "Go to gap logo tote" → "/gap-logo-tote"
       - "Show me dog food" → "/product/1"
       - "Take me to pet toys" → "/personalized/3"

    3. Shopping Features
       - "Show my cart" → "/cart"
       - "Go to my profile" → "/profile"
       - "Take me to the store" → "/instore"
       - "Show personalized items" → "/personalized"

    Cart Commands:
    - "Add this to my cart"
    - "Add to cart"
    - "Put this in my cart"
    - "I want to buy this"
    - "Add this item to cart"
    - "Add to shopping cart"

    Navigation Commands:
    - "Take me to..."
    - "Show me..."
    - "Go to..."
    - "Navigate to..."
    - "I want to see..."
    - "Where can I find..."
    - "Show me where to find..."

    You can understand natural language requests for any product or category in the store.
    If a user asks for something not in the predefined routes, try to find the closest matching category or product.
    Always confirm the navigation with a friendly response.
    When adding items to cart, confirm the action with a friendly message.`
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
              "/all",
              "/dog",
              "/clothing",
              "/electronics",
              "/product/1",
              "/product/2",
              "/product/3",
              "/product/4",
              "/personalized",
              "/personalized/1",
              "/personalized/2",
              "/personalized/3",
              "/personalized/4",
              "/profile",
              "/cart",
              "/instore",
              "/baby-boot-jean",
              "/modern-rib-pullover",
              "/straw-panama-hat",
              "/gap-logo-tote"
            ]
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
          action: {
            type: SchemaType.STRING,
            description: "The action to perform",
            enum: ["click"]
          },
          response: {
            type: SchemaType.STRING,
            description: "A friendly response to confirm the item was added to cart"
          }
        },
        required: ["action"]
      }
    },
    {
      name: "respondToRewardsPrompt",
      description: "Handle rewards program interactions",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          isRewardsMember: {
            type: SchemaType.BOOLEAN,
            description: "Whether the user is a rewards member"
          }
        },
        required: ["isRewardsMember"]
      }
    },
    {
      name: "showInstoreRecommendations",
      description: "Show personalized recommendations in store",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          action: {
            type: SchemaType.STRING,
            description: "The action to perform",
            enum: ["show"]
          }
        },
        required: ["action"]
      }
    }
  ]
}];

const NavAssistantComponent = () => {
  const { client, setConfig, connected } = useLiveAPIContext();
  const navigate = useNavigate();

  // Set up initial config
  useEffect(() => {
    setConfig({
      model: "models/gemini-2.0-flash-exp",
      tools: toolObject,
      systemInstruction: systemInstructionObject,
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
        switch (fCall.name) {
          case "navigate":
            if (fCall.args?.route) {
              try {
                if (fCall.args.route.startsWith('/personalized/')) {
                  const productId = fCall.args.route.split('/').pop();
                  const productCard = document.querySelector(
                    `.product-card[data-product-id="${productId}"]`
                  ) as HTMLElement;
                  
                  if (productCard) {
                    productCard.click();
                    // Send confirmation response
                    if (fCall.args.response) {
                      client.send([{ text: fCall.args.response }]);
                    }
                  }
                } else {
                  navigate(fCall.args.route);
                  // Send confirmation response
                  if (fCall.args.response) {
                    client.send([{ text: fCall.args.response }]);
                  }
                }
              } catch (error) {
                console.error('Navigation error:', error);
                client.send([{ text: "I apologize, but I couldn't navigate to that location. Could you please try again?" }]);
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
              } else if (location.includes('/product/')) {
                // For regular product pages
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

          case "respondToRewardsPrompt":
            if (fCall.args?.isRewardsMember) {
              const yesButton = document.querySelector('.rewards-prompt button:first-child') as HTMLButtonElement;
              if (yesButton) {
                yesButton.click();
              }
            } else {
              const noButton = document.querySelector('.rewards-prompt button:last-child') as HTMLButtonElement;
              if (noButton) {
                noButton.click();
              }
            }
            break;
          
          case "showInstoreRecommendations":
            // Trigger the instore recommendations display
            const event = new CustomEvent('showInstoreRecommendations');
            document.dispatchEvent(event);
            break;
        }
      });
    };

    client.on("toolcall", handleToolCall);
    return () => {
      client.off("toolcall", handleToolCall);
    };
  }, [client, navigate]);

  return null;
};

export const NavAssistant = memo(NavAssistantComponent); 