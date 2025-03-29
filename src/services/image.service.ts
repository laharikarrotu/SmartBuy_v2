/**
 * Image Service
 * Handles retrieving product images with correct paths and provides default 
 * category-specific fallback images when needed.
 */

// Define fallback images by product category
const FALLBACK_IMAGES = {
  electronics: '/images/placeholders/smartphone.svg',
  clothing: '/images/placeholders/clothing.svg',
  dog: '/images/placeholders/pet.svg',
  cat: '/images/placeholders/pet.svg',
  default: '/images/placeholder-product.svg'
};

/**
 * Get the image URL for a product
 * @param {string} imageUrl - The original image URL
 * @param {string} category - The product category
 * @param {string} [id] - Optional product ID for more specific fallbacks
 * @returns {string} - The resolved image URL
 */
export const getProductImage = (
  imageUrl: string,
  category: 'electronics' | 'clothing' | 'dog' | 'cat',
  id?: string
): string => {
  // Validate and clean the URL
  if (!imageUrl || imageUrl.trim() === '') {
    return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
  }

  // Return the properly formatted URL
  return imageUrl;
};

/**
 * Get a fallback image for a specific category
 * @param {string} category - The product category
 * @returns {string} - The fallback image URL
 */
export const getFallbackImage = (
  category: 'electronics' | 'clothing' | 'dog' | 'cat'
): string => {
  return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
};

export default {
  getProductImage,
  getFallbackImage
}; 