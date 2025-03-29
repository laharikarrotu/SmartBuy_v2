/**
 * Central service for handling API requests
 */

const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * API methods for different endpoints
 */
export const ApiService = {
  /**
   * Get products with optional filtering
   */
  getProducts: async (category?: string, filter?: Record<string, any>) => {
    const queryParams = new URLSearchParams();
    
    if (category) {
      queryParams.append('category', category);
    }
    
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchWithErrorHandling<any[]>(`/products${query}`);
  },

  /**
   * Get a single product by ID
   */
  getProductById: async (id: string) => {
    return fetchWithErrorHandling<any>(`/products/${id}`);
  },

  /**
   * Submit order information
   */
  submitOrder: async (orderData: any) => {
    return fetchWithErrorHandling('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
};

export default ApiService; 