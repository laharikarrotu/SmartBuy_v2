/**
 * Services barrel file for exporting all services
 */

export { default as ApiService } from './api.service';
export { default as AuthService } from './auth.service';
export { default as CartService } from './cart.service';
export { default as ProductService } from './product.service';
export { default as AnalyticsService } from './analytics.service';

// Re-export interfaces and types
export type { UserPreferences, UserProfile } from './auth.service';
export type { BaseProduct, ProductCategory } from './product.service'; 