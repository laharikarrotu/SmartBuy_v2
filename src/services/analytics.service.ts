/**
 * Analytics service for tracking user interactions
 */

type EventCategory = 'page_view' | 'product' | 'cart' | 'checkout' | 'search' | 'interaction' | 'web_vitals';
type EventAction = 'view' | 'click' | 'add' | 'remove' | 'update' | 'submit' | 'complete' | 'search' | string;

interface AnalyticsEvent {
  category: EventCategory;
  action: EventAction;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Placeholder for real analytics implementation
let analyticsInitialized = false;

export const AnalyticsService = {
  /**
   * Initialize analytics with configuration
   */
  init: (debug = false): void => {
    console.log('Analytics service initialized', debug ? 'in debug mode' : '');
    analyticsInitialized = true;
    
    // Here you would actually initialize your analytics platform
    // For example:
    // if (window.gtag) {
    //   window.gtag('config', 'G-XXXXXXXXXX', { 
    //     send_page_view: true,
    //     debug_mode: debug
    //   });
    // }
  },

  /**
   * Track a page view
   */
  trackPageView: (path: string, title?: string): void => {
    if (!analyticsInitialized) {
      console.warn('Analytics not initialized before tracking page view');
      return;
    }
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics - Page View:', { path, title });
    }
    
    // Actual implementation would use your analytics platform
    // For example:
    // if (window.gtag) {
    //   window.gtag('event', 'page_view', {
    //     page_path: path,
    //     page_title: title
    //   });
    // }
  },

  /**
   * Track a generic event
   */
  trackEvent: (event: AnalyticsEvent): void => {
    if (!analyticsInitialized) {
      console.warn('Analytics not initialized before tracking event');
      return;
    }
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics - Event:', event);
    }
    
    // Actual implementation would use your analytics platform
    // For example:
    // if (window.gtag) {
    //   window.gtag('event', event.action, {
    //     event_category: event.category,
    //     event_label: event.label,
    //     value: event.value,
    //     ...event
    //   });
    // }
  },

  /**
   * Helper method to track product views
   */
  trackProductView: (productId: string, name: string, category: string, price?: number): void => {
    AnalyticsService.trackEvent({
      category: 'product',
      action: 'view',
      label: name,
      productId,
      productCategory: category,
      value: price
    });
  },

  /**
   * Helper method to track adding to cart
   */
  trackAddToCart: (productId: string, name: string, price: number, quantity: number): void => {
    AnalyticsService.trackEvent({
      category: 'cart',
      action: 'add',
      label: name,
      productId,
      price,
      quantity,
      value: price * quantity
    });
  },

  /**
   * Helper method to track checkout steps
   */
  trackCheckoutStep: (step: number, option?: string): void => {
    AnalyticsService.trackEvent({
      category: 'checkout',
      action: 'step',
      value: step,
      option: option || ''
    });
  },

  /**
   * Helper method to track searches
   */
  trackSearch: (query: string, resultsCount: number): void => {
    AnalyticsService.trackEvent({
      category: 'search',
      action: 'search',
      label: query,
      value: resultsCount
    });
  },

  /**
   * Helper method to track web vitals metrics
   */
  trackWebVitals: (name: string, value: number): void => {
    AnalyticsService.trackEvent({
      category: 'web_vitals',
      action: name,
      value: Math.round(value),
      label: 'Performance'
    });
  }
};

export default AnalyticsService; 