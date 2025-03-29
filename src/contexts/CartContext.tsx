import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the CartItem interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
  originalPrice?: number;
  fit?: string;
  category: 'clothing' | 'electronics' | 'dog' | 'cat';
  description?: string;
  inStock?: boolean;
  brand?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  specifications?: Record<string, string>;
}

// Define the CartContext interface
interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getCartTotal: () => number;
  setItems: (items: CartItem[]) => void;
  clearCart: () => void;
  itemCount: number;
}

// Create the context with undefined as default
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart items state
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Check if the saved cart is not expired
        if (parsedCart.expiry && new Date().getTime() < parsedCart.expiry) {
          setItems(parsedCart.items);
          
          // Calculate total items
          const total = parsedCart.items.reduce((count: number, item: CartItem) => count + item.quantity, 0);
          setItemCount(total);
        } else {
          // Clear expired cart
          localStorage.removeItem('cartItems');
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      const cartData = {
        items: items,
        expiry: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours expiry
      };
      localStorage.setItem('cartItems', JSON.stringify(cartData));
      
      // Update item count
      const total = items.reduce((count, item) => count + item.quantity, 0);
      setItemCount(total);
    } else {
      localStorage.removeItem('cartItems');
      setItemCount(0);
    }
  }, [items]);

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    setItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(i => 
        i.id === item.id && 
        i.size === item.size && 
        i.color === item.color
      );

      if (existingItem) {
        // Update quantity if the item exists
        return prevItems.map(i => 
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, item];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update the quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Clear all items from the cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cartItems');
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        getCartTotal, 
        setItems,
        clearCart,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};