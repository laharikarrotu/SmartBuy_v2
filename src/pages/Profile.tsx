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
  
  // Initial chat histories with proper quotes
  const initialChats: ChatHistory[] = [
    {
      id: 'chat-1',
      title: 'Dog food recommendations...',
      createdAt: new Date('2024-03-15T10:30:00'),
      messages: [
        {
          role: 'assistant',
          content: "Hello! I'm your SmartBuy shopping assistant. How can I help you find the perfect products today?",
          timestamp: new Date('2024-03-15T10:30:00'),
          id: 'initial-1'
        },
        {
          role: 'user',
          content: "I need recommendations for dog food. My golden retriever is 2 years old and has a sensitive stomach.",
          timestamp: new Date('2024-03-15T10:31:00'),
          id: 'user-1'
        }
      ]
    }
  ];
  
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>(initialChats);
  const [currentChatId, setCurrentChatId] = useState('chat-1');
  const [messages, setMessages] = useState<ChatMessage[]>(initialChats[0].messages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Update chat histories when messages change
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
        content: "Hello! I'm your shopping assistant. How can I help you today?",
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
      content: "Hello! I'm your shopping assistant. How can I help you today?",
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

  const toggleChatList = () => {
    setShowChatList(!showChatList);
  };

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
              <h2>Shopping Assistant</h2>
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
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 