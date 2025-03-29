import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

interface SavedItemsContextType {
  savedItems: Product[];
  addToSavedItems: (product: Product) => void;
  removeFromSavedItems: (productId: number) => void;
  isSaved: (productId: number) => boolean;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export const SavedItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedItems, setSavedItems] = useState<Product[]>([]);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('savedItems');
    if (savedProducts) {
      setSavedItems(JSON.parse(savedProducts));
    }
  }, []);

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToSavedItems = (product: Product) => {
    setSavedItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromSavedItems = (productId: number) => {
    setSavedItems(prev => prev.filter(item => item.id !== productId));
  };

  const isSaved = (productId: number) => {
    return savedItems.some(item => item.id === productId);
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, addToSavedItems, removeFromSavedItems, isSaved }}>
      {children}
    </SavedItemsContext.Provider>
  );
};

export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (context === undefined) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
}; 