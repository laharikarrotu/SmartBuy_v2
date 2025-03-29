import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface AppContextType {
  isNavAssistantOpen: boolean;
  toggleNavAssistant: () => void;
  isControlTrayOpen: boolean;
  toggleControlTray: () => void;
  isAuthenticated: boolean;
  user: any;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavAssistantOpen, setIsNavAssistantOpen] = useState(false);
  const [isControlTrayOpen, setIsControlTrayOpen] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, logout: auth0Logout } = useAuth0();

  const toggleNavAssistant = useCallback(() => {
    setIsNavAssistantOpen(prev => !prev);
  }, []);

  const toggleControlTray = useCallback(() => {
    setIsControlTrayOpen(prev => !prev);
  }, []);

  const login = useCallback(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  const logout = useCallback(() => {
    auth0Logout();
  }, [auth0Logout]);

  return (
    <AppContext.Provider
      value={{
        isNavAssistantOpen,
        toggleNavAssistant,
        isControlTrayOpen,
        toggleControlTray,
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 