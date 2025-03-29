/**
 * Authentication service with Auth0 integration
 */
import { User } from '@auth0/auth0-react';

// Default user preferences
const DEFAULT_USER_PREFERENCES = {
  theme: 'light' as const,
  notifications: true,
  saveHistory: true,
};

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  saveHistory: boolean;
  [key: string]: any;
}

export interface UserProfile extends User {
  preferences?: UserPreferences;
}

export const AuthService = {
  /**
   * Get user preferences from localStorage or return defaults
   */
  getUserPreferences: (userId: string): UserPreferences => {
    try {
      const savedPreferences = localStorage.getItem(`user_preferences_${userId}`);
      if (savedPreferences) {
        return JSON.parse(savedPreferences);
      }
    } catch (error) {
      console.error('Failed to get user preferences:', error);
    }
    
    return DEFAULT_USER_PREFERENCES;
  },

  /**
   * Save user preferences to localStorage
   */
  saveUserPreferences: (userId: string, preferences: UserPreferences): void => {
    try {
      localStorage.setItem(
        `user_preferences_${userId}`,
        JSON.stringify({ ...DEFAULT_USER_PREFERENCES, ...preferences })
      );
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  },

  /**
   * Enhance Auth0 user profile with additional data
   */
  enrichUserProfile: (user: User): UserProfile => {
    if (!user || !user.sub) {
      return user as UserProfile;
    }

    return {
      ...user,
      preferences: AuthService.getUserPreferences(user.sub),
    };
  },

  /**
   * Clear all user-related data from localStorage
   */
  clearUserData: (userId: string): void => {
    try {
      localStorage.removeItem(`user_preferences_${userId}`);
      // Clear any other user-specific data here
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  },
};

export default AuthService; 