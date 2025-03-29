/**
 * Product service for managing product-related operations
 */

export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  brand?: string;
  rating?: number;
  reviews?: number;
  [key: string]: any;
}

export type ProductCategory = 'clothing' | 'electronics' | 'dog' | 'cat' | string;

// User's recently viewed products storage
const RECENTLY_VIEWED_STORAGE_KEY = 'smartapp_recently_viewed';
const MAX_RECENTLY_VIEWED = 10;

// Product comparison storage
const COMPARISON_STORAGE_KEY = 'smartapp_comparison';

export const ProductService = {
  /**
   * Get recently viewed products
   */
  getRecentlyViewed: (): string[] => {
    try {
      const data = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get recently viewed products:', error);
      return [];
    }
  },

  /**
   * Add product to recently viewed
   */
  addToRecentlyViewed: (productId: string): void => {
    try {
      const recentlyViewed = ProductService.getRecentlyViewed();
      
      // Remove if already exists
      const filteredList = recentlyViewed.filter(id => id !== productId);
      
      // Add to beginning of array
      filteredList.unshift(productId);
      
      // Limit to max items
      const trimmedList = filteredList.slice(0, MAX_RECENTLY_VIEWED);
      
      localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(trimmedList));
    } catch (error) {
      console.error('Failed to add to recently viewed:', error);
    }
  },

  /**
   * Get products for comparison
   */
  getComparisonProducts: (): string[] => {
    try {
      const data = localStorage.getItem(COMPARISON_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get comparison products:', error);
      return [];
    }
  },

  /**
   * Add product to comparison
   */
  addToComparison: (productId: string): boolean => {
    try {
      const comparisonList = ProductService.getComparisonProducts();
      
      // Check if already exists
      if (comparisonList.includes(productId)) {
        return true;
      }
      
      // Only allow up to 4 products in comparison
      if (comparisonList.length >= 4) {
        return false;
      }
      
      comparisonList.push(productId);
      localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(comparisonList));
      return true;
    } catch (error) {
      console.error('Failed to add to comparison:', error);
      return false;
    }
  },

  /**
   * Remove product from comparison
   */
  removeFromComparison: (productId: string): void => {
    try {
      const comparisonList = ProductService.getComparisonProducts();
      const updatedList = comparisonList.filter(id => id !== productId);
      localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error('Failed to remove from comparison:', error);
    }
  },

  /**
   * Clear comparison list
   */
  clearComparison: (): void => {
    localStorage.removeItem(COMPARISON_STORAGE_KEY);
  },

  /**
   * Calculate discount percentage
   */
  calculateDiscountPercentage: (originalPrice: number, currentPrice: number): number => {
    if (!originalPrice || originalPrice <= currentPrice) {
      return 0;
    }
    
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  },

  /**
   * Format price with currency symbol
   */
  formatPrice: (price: number): string => {
    return `$${price.toFixed(2)}`;
  }
};

export default ProductService; 