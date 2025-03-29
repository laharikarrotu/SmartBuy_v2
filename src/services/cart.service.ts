/**
 * Cart service for managing shopping cart operations
 */

import { CartItem } from '../contexts/CartContext';

const CART_STORAGE_KEY = 'smartapp_cart';

export const CartService = {
  /**
   * Get cart items from localStorage
   */
  getCartItems: (): CartItem[] => {
    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Failed to get cart items:', error);
      return [];
    }
  },

  /**
   * Save cart items to localStorage
   */
  saveCartItems: (items: CartItem[]): void => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart items:', error);
    }
  },

  /**
   * Add item to cart
   */
  addItem: (item: CartItem): CartItem[] => {
    const currentCart = CartService.getCartItems();
    
    // Check if item already exists in cart
    const existingItemIndex = currentCart.findIndex(
      (cartItem) => cartItem.id === item.id && 
                   cartItem.size === item.size && 
                   cartItem.color === item.color
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      currentCart.push(item);
    }

    CartService.saveCartItems(currentCart);
    return currentCart;
  },

  /**
   * Update item quantity
   */
  updateItemQuantity: (itemId: string, quantity: number, options?: { size?: string, color?: string }): CartItem[] => {
    const currentCart = CartService.getCartItems();
    
    const updatedCart = currentCart.map((item) => {
      // Match item by ID and optional attributes
      if (item.id === itemId && 
         (!options?.size || item.size === options.size) && 
         (!options?.color || item.color === options.color)) {
        return { ...item, quantity };
      }
      return item;
    });

    CartService.saveCartItems(updatedCart);
    return updatedCart;
  },

  /**
   * Remove item from cart
   */
  removeItem: (itemId: string, options?: { size?: string, color?: string }): CartItem[] => {
    const currentCart = CartService.getCartItems();
    
    const updatedCart = currentCart.filter(
      (item) => !(item.id === itemId && 
                 (!options?.size || item.size === options.size) && 
                 (!options?.color || item.color === options.color))
    );

    CartService.saveCartItems(updatedCart);
    return updatedCart;
  },

  /**
   * Clear all items from cart
   */
  clearCart: (): void => {
    localStorage.removeItem(CART_STORAGE_KEY);
  },

  /**
   * Calculate cart totals
   */
  calculateTotals: (items: CartItem[]) => {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    
    return {
      subtotal,
      itemCount,
      tax: subtotal * 0.08, // Assuming 8% tax rate
      shipping: subtotal > 100 ? 0 : 9.99, // Free shipping over $100
      get total() {
        return this.subtotal + this.tax + this.shipping;
      },
    };
  },
};

export default CartService; 