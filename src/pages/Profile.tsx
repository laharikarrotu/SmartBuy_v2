import { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.scss';

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string
  // Add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  id: string;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}

// Use environment variable for Gemini API
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

export const Profile = () => {
  const { user, isLoading } = useAuth0();
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: 'chat-1',
      title: 'Dog food recommendations...',
      createdAt: new Date('2024-03-15T10:30:00'),
      messages: [
        {
          role: 'assistant',
          content: 'Hello! I\'m your SmartBuy shopping assistant. How can I help you find the perfect products today?',
          timestamp: new Date('2024-03-15T10:30:00'),
          id: 'initial-1'
        },
        {
          role: 'user',
          content: 'I need recommendations for dog food. My golden retriever is 2 years old and has a sensitive stomach.',
          timestamp: new Date('2024-03-15T10:31:00'),
          id: 'user-1'
        },
        {
          role: 'assistant',
          content: 'I\'d recommend Hill\'s Science Diet Sensitive Stomach & Skin Adult Dog Food. It\'s specially formulated for digestive health and currently 20% off with Treats™ membership. Would you like to see the details?',
          timestamp: new Date('2024-03-15T10:31:30'),
          id: 'assistant-1'
        },
        {
          role: 'user',
          content: 'Yes, that sounds perfect! What size bags are available?',
          timestamp: new Date('2024-03-15T10:32:00'),
          id: 'user-2'
        },
        {
          role: 'assistant',
          content: 'It comes in 15lb and 30lb bags. The 30lb bag is the better value at $64.99, plus you\'ll earn 650 Treats™ points. Would you like me to add it to your cart? I can also suggest some digestive supplements that pair well with this food.',
          timestamp: new Date('2024-03-15T10:32:30'),
          id: 'assistant-2'
        }
      ]
    },
    {
      id: 'chat-2',
      title: 'Help with grooming services...',
      createdAt: new Date('2024-03-14T15:20:00'),
      messages: [
        {
          role: 'assistant',
          content: 'Hello! I\'m your PetSmart shopping assistant. How can I help you today?',
          timestamp: new Date('2024-03-14T15:20:00'),
          id: 'initial-2'
        },
        {
          role: 'user',
          content: 'I need to schedule a grooming appointment for my Shih Tzu. What services do you offer?',
          timestamp: new Date('2024-03-14T15:21:00'),
          id: 'user-3'
        },
        {
          role: 'assistant',
          content: 'We offer full-service grooming including bath, haircut, nail trim, and ear cleaning. For Shih Tzus, we recommend our Breed-Specific Package which includes special attention to face and paw trimming. First-time clients get 20% off! Would you like to see available appointments?',
          timestamp: new Date('2024-03-14T15:21:30'),
          id: 'assistant-3'
        },
        {
          role: 'user',
          content: 'Yes, what\'s available next weekend?',
          timestamp: new Date('2024-03-14T15:22:00'),
          id: 'user-4'
        },
        {
          role: 'assistant',
          content: 'I see openings on Saturday at 10am and 2pm, or Sunday at 11am. Each appointment is about 2-3 hours. Would you like me to book one of these times? All new clients also receive a free Teeth Brushing service ($15 value).',
          timestamp: new Date('2024-03-14T15:22:30'),
          id: 'assistant-4'
        }
      ]
    },
    {
      id: 'chat-3',
      title: 'Looking for training classes...',
      createdAt: new Date('2024-03-13T09:15:00'),
      messages: [
        {
          role: 'assistant',
          content: 'Hello! I\'m your PetSmart shopping assistant. How can I help you today?',
          timestamp: new Date('2024-03-13T09:15:00'),
          id: 'initial-3'
        },
        {
          role: 'user',
          content: 'What puppy training classes do you offer? I have a 4-month-old Lab.',
          timestamp: new Date('2024-03-13T09:16:00'),
          id: 'user-5'
        },
        {
          role: 'assistant',
          content: 'Our Puppy Training package includes 6 weeks of classes covering basic commands, socialization, and house training. Classes are small groups of 6-8 puppies. The next session starts this Tuesday at 6pm. Would you like more details?',
          timestamp: new Date('2024-03-13T09:16:30'),
          id: 'assistant-5'
        },
        {
          role: 'user',
          content: 'What\'s included in the package and how much does it cost?',
          timestamp: new Date('2024-03-13T09:17:00'),
          id: 'user-6'
        },
        {
          role: 'assistant',
          content: 'The package is $129 and includes all 6 classes, a training clicker, treat pouch, and training guide. Treats™ members save 10% and earn double points. You\'ll also get 15% off any training supplies purchased during the course. Would you like to enroll?',
          timestamp: new Date('2024-03-13T09:17:30'),
          id: 'assistant-6'
        }
      ]
    },
    {
      id: 'chat-4',
      title: 'Help with flea treatment...',
      createdAt: new Date('2024-03-12T14:25:00'),
      messages: [
        {
          role: 'assistant',
          content: 'Hello! I\'m your PetSmart shopping assistant. How can I help you today?',
          timestamp: new Date('2024-03-12T14:25:00'),
          id: 'initial-4'
        },
        {
          role: 'user',
          content: 'I need flea treatment for my dog. What do you recommend?',
          timestamp: new Date('2024-03-12T14:26:00'),
          id: 'user-7'
        },
        {
          role: 'assistant',
          content: 'Frontline Plus is our most popular option, providing 30-day protection against fleas and ticks. What\'s your dog\'s weight? This will help me recommend the right dosage. We also have a special bundle that includes a free flea comb.',
          timestamp: new Date('2024-03-12T14:26:30'),
          id: 'assistant-7'
        },
        {
          role: 'user',
          content: 'She\'s about 45 pounds. How many months of treatment should I get?',
          timestamp: new Date('2024-03-12T14:27:00'),
          id: 'user-8'
        },
        {
          role: 'assistant',
          content: 'For a 45-pound dog, I recommend the 45-88 lb dosage. Our 6-month supply is the best value at $109.99 (saves $30 vs. monthly). Plus, Autoship members save an extra 35% on their first order and 5% on recurring deliveries. Would you like me to add this to your cart?',
          timestamp: new Date('2024-03-12T14:27:30'),
          id: 'assistant-8'
        }
      ]
    },
    {
      id: 'chat-5',
      title: 'Recommendations for new puppy...',
      createdAt: new Date('2024-03-11T11:15:00'),
      messages: [
        {
          role: 'assistant',
          content: 'Hello! I\'m your PetSmart shopping assistant. How can I help you today?',
          timestamp: new Date('2024-03-11T11:15:00'),
          id: 'initial-5'
        },
        {
          role: 'user',
          content: 'I just adopted a puppy! What essential items do I need?',
          timestamp: new Date('2024-03-11T11:16:00'),
          id: 'user-11'
        },
        {
          role: 'assistant',
          content: 'Congratulations on your new puppy! I\'ll help you create a New Puppy Starter Kit. Our essentials bundle includes a crate, bed, food/water bowls, puppy food, collar, leash, and basic toys. What breed is your puppy?',
          timestamp: new Date('2024-03-11T11:16:30'),
          id: 'assistant-11'
        },
        {
          role: 'user',
          content: 'She\'s a Beagle mix, about 8 weeks old.',
          timestamp: new Date('2024-03-11T11:17:00'),
          id: 'user-12'
        },
        {
          role: 'assistant',
          content: 'Perfect! For a Beagle mix, I recommend our medium-sized starter bundle. It includes a 30" crate with divider panel, machine-washable bed, Royal Canin puppy food, and chew toys perfect for teething. The bundle saves you 25% versus buying separately. Would you like to see the full details?',
          timestamp: new Date('2024-03-11T11:17:30'),
          id: 'assistant-12'
        }
      ]
    },
    {
      id: 'chat-6',
      title: 'Trending GAP jeans styles...',
      createdAt: new Date('2024-03-10T13:45:00'),
      messages: [
        {
          role: 'assistant',
          content: 'Hello! I\'m your shopping assistant. How can I help you today?',
          timestamp: new Date('2024-03-10T13:45:00'),
          id: 'initial-6'
        },
        {
          role: 'user',
          content: 'What are the most popular jeans styles at GAP right now? I want something trendy but comfortable.',
          timestamp: new Date('2024-03-10T13:46:00'),
          id: 'user-15'
        },
        {
          role: 'assistant',
          content: "Our top trending styles right now are the '90s Loose Fit Jeans and the High Rise Vintage Slim. The '90s Loose is perfect for that relaxed, vintage-inspired look, while the Vintage Slim offers a more tailored silhouette. Both are made with our premium stretch denim for all-day comfort. Would you like details on specific features?",
          timestamp: new Date('2024-03-10T13:46:30'),
          id: 'assistant-15'
        },
        {
          role: 'user',
          content: "Tell me more about the '90s Loose Fit. What washes are available and how do they fit?'",
          timestamp: new Date('2024-03-10T13:47:00'),
          id: 'user-16'
        },
        {
          role: 'assistant',
          content: "The '90s Loose Fit comes in 6 washes: Medium Destroy, Light Destroy with Rips, Dark Clean, Vintage Light, Sky Blue, and Black. They sit at the high waist and feature a relaxed fit through the hip and thigh with a slight taper at the ankle. The most popular wash is Medium Destroy, which has subtle distressing and a lived-in look. They\'re currently part of our denim event at 40% off, making them $53.99 (originally $89.95). Would you like to see how they look on different body types?'",
          timestamp: new Date('2024-03-10T13:47:30'),
          id: 'assistant-16'
        },
        {
          role: 'user',
          content: 'Yes, please show me. Also, do they stretch out with wear? I\'m between sizes.',
          timestamp: new Date('2024-03-10T13:48:00'),
          id: 'user-17'
        },
        {
          role: 'assistant',
          content: "The '90s Loose Fit is made with our premium stretch denim that holds its shape throughout the day. They will give about a half-size with wear, so I recommend sizing down if you\'re between sizes. They\'re available in sizes 24-35 and come in three lengths: Short (27), Regular (29), and Long (31). Our models are wearing sizes 27 and 31 to show the fit on different body types. The relaxed fit is especially flattering on all shapes. Would you like me to help you find your perfect size?'",
          timestamp: new Date('2024-03-10T13:48:30'),
          id: 'assistant-17'
        },
        {
          role: 'user',
          content: 'I think I\'ll try the Medium Destroy in 27. What tops do you recommend styling with these?',
          timestamp: new Date('2024-03-10T13:49:00'),
          id: 'user-18'
        },
        {
          role: 'assistant',
          content: "'Great choice! For the Medium Destroy '90s Loose, I recommend our new Cropped Baby Tee ($29.95) for a true '90s vibe, or our Boxy Oxford Shirt ($65) for a more polished look. Both are trending right now and work perfectly with the high waist. The Baby Tee comes in 8 colors, and we\'re running a buy-one-get-one 50% off promotion. For a layered look, our Oversized Denim Jacket ($89.95) pairs beautifully with these jeans in a contrasting wash. Would you like to see these styling options?'",
          timestamp: new Date('2024-03-10T13:49:30'),
          id: 'assistant-18'
        },
        {
          role: 'user',
          content: 'The Baby Tee sounds perfect. Can you add the jeans in 27 Medium Destroy and two Baby Tees - one in white and one in black?',
          timestamp: new Date('2024-03-10T13:50:00'),
          id: 'user-19'
        },
        {
          role: 'assistant',
          content: "'I\'ve added the '90s Loose Fit Jeans in size 27 Medium Destroy ($53.99) and two Baby Tees in White and Black ($29.95 for the first, $14.98 for the second with the BOGO promotion). Your total comes to $98.92, and you qualify for free shipping with your GAP Rewards membership! The estimated delivery is 3-5 business days. Would you like to see our trending accessories to complete the look?'",
          timestamp: new Date('2024-03-10T13:50:30'),
          id: 'assistant-19'
        },
        {
          role: 'user',
          content: 'Yes, what accessories would work well with this outfit?',
          timestamp: new Date('2024-03-10T13:51:00'),
          id: 'user-20'
        },
        {
          role: 'assistant',
          content: "'To complete your '90s-inspired look, I recommend our Leather Platform Sneakers in White ($79.95), the Mini Canvas Backpack ($49.95, currently 30% off), and our bestselling Gold-Plated Chain Necklace Set ($34.95). The sneakers add height while keeping the look casual, and the layered necklaces are perfect with the Baby Tee neckline. We also have matching anklets if you want to fully embrace the '90s trend! Would you like me to add any of these to your cart?'",
          timestamp: new Date('2024-03-10T13:51:30'),
          id: 'assistant-20'
        }
      ]
    }
  ]);

  // Set initial currentChatId to the first chat
  const [currentChatId, setCurrentChatId] = useState('chat-1');
  
  // Set initial messages to the first chat's messages
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistories[0].messages);

  // Remove the localStorage effects that might be overwriting the chat histories
  useEffect(() => {
    if (messages.length > 1) {
      const title = messages[1]?.content.slice(0, 30) + '...';
      setChatHistories(prev => {
        const updated = prev.filter(h => h.id !== currentChatId);
        return [{
          id: currentChatId,
          title,
          messages,
          createdAt: new Date()
        }, ...updated];
      });
    }
  }, [messages, currentChatId]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatHistoryLimit = 50;

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatMessages = messagesEndRef.current.parentElement;
      chatMessages?.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const generateResponse = async (userInput: string): Promise<string> => {
    try {
      const ws = new WebSocket(uri);
      
      return new Promise((resolve, reject) => {
        ws.onopen = () => {
          const request = {
            contents: [{
              parts: [{
                text: userInput
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          };

          ws.send(JSON.stringify({
            url: uri,
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': API_KEY
            },
            body: request
          }));
        };

        ws.onmessage = (event) => {
          const response = JSON.parse(event.data);
          if (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
            resolve(response.candidates[0].content.parts[0].text);
          } else {
            resolve("I apologize, but I couldn't process your request at the moment.");
          }
          ws.close();
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject("I apologize, but I'm having trouble connecting right now. Please try again later.");
        };
      });
    } catch (error) {
      console.error('Error generating response:', error);
      return "I apologize, but I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      id: `user-${Date.now()}`
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Wait for DOM update before scrolling
    setTimeout(scrollToBottom, 100);

    try {
      const response = await generateResponse(inputMessage);
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        id: `assistant-${Date.now()}`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChatHistory = () => {
    const confirmClear = window.confirm('Are you sure you want to clear chat history?');
    if (confirmClear) {
      setMessages([{
        role: 'assistant',
        content: 'Hello! I\'m your shopping assistant. How can I help you today?',
        timestamp: new Date(),
        id: 'initial'
      }]);
    }
  };

  const startNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setCurrentChatId(newChatId);
    setMessages([{
      role: 'assistant',
      content: 'Hello Venu! I\'m your shopping assistant. How can I help you today?',
      timestamp: new Date(),
      id: 'initial'
    }]);
  };

  const loadChat = (chatId: string) => {
    const chat = chatHistories.find(h => h.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
    setShowChatList(false);
  };

  const deleteChat = (chatId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this chat?');
    if (confirmDelete) {
      setChatHistories(prev => prev.filter(h => h.id !== chatId));
      if (currentChatId === chatId) {
        startNewChat();
      }
    }
  };

  // Add debug logging
  useEffect(() => {
    console.log('Chat Histories:', chatHistories);
    console.log('Show Chat List:', showChatList);
    console.log('Current Chat ID:', currentChatId);
  }, [chatHistories, showChatList, currentChatId]);

  // Modify the button click handler
  const toggleChatList = () => {
    console.log('Toggle Chat List clicked');
    console.log('Current showChatList value:', showChatList);
    setShowChatList(!showChatList);
  };

  const petProfiles = [
    {
      id: 1,
      name: 'Max',
      breed: 'Golden Retriever',
      age: '2 years',
      image: 'https://cdn.playgrnd.media/v7/img/breeds/brd_1120.jpg?w=480&h=480&fm=jpg'
    },
    // Add more pet profiles as needed
  ];

  const treatsPoints = 2500;
  const nextRewardAt = 3000;

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-section">
          <h1>My Profile</h1>
          {user && (
            <div className="profile-info">
              {user.picture && (
                <img src={user.picture} alt={user.name || 'Profile'} className="profile-image" />
              )}
              <div className="profile-details">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-value">12</span>
                    <span className="stat-label">Orders</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">5</span>
                    <span className="stat-label">Reviews</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">3</span>
                    <span className="stat-label">Wishlists</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="treats-rewards">
            <h3>Treats™ Rewards</h3>
            <div className="points">{treatsPoints} points</div>
            <div className="rewards-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${(treatsPoints / nextRewardAt) * 100}%` }}
              />
            </div>
            <p>{nextRewardAt - treatsPoints} points until next reward</p>
          </div>

          <div className="pet-profiles">
            <h3>My Pets</h3>
            <div className="pet-list">
              {petProfiles.map(pet => (
                <div key={pet.id} className="pet-card">
                  <img src={pet.image} alt={pet.name} />
                  <div className="pet-name">{pet.name}</div>
                  <div className="pet-breed">{pet.breed}</div>
                  <div className="pet-age">{pet.age}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chatbot-section">
          <div className="chat-header">
            <div className="chat-controls">
              <button 
                onClick={toggleChatList}
                className={`chat-list-btn ${showChatList ? 'active' : ''}`}
              >
                ☰
              </button>
              <h2>Venu's Shopping Assistant</h2>
            </div>
            <div className="chat-actions">
              <button onClick={startNewChat} className="new-chat">
                New Chat
              </button>
            </div>
          </div>

          <div className="chat-container">
            <div className={`chat-sidebar ${showChatList ? 'visible' : ''}`}>
              <div className="sidebar-header">
                <h3>Chat History ({chatHistories.length})</h3>
              </div>
              <div className="chat-history-list">
                {chatHistories.map((chat) => (
                  <div 
                    key={chat.id} 
                    className={`chat-history-item ${currentChatId === chat.id ? 'active' : ''}`}
                    onClick={() => loadChat(chat.id)}
                  >
                    <div className="chat-title">
                      {chat.title}
                    </div>
                    <div className="chat-meta">
                      <span className="chat-date">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }} 
                        className="delete-chat"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`chat-main ${showChatList ? 'shifted' : ''}`}>
              <div className="chat-messages">
                {messages.map((message) => (
                  <div key={message.id} className={`message ${message.role}`}>
                    <div className="message-content">
                      {message.content}
                    </div>
                    <div className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="typing-indicator">
                    Assistant is typing...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="chat-input">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about products, sizes, or style advice..."
                />
                <button type="submit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 2L11 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 