import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Main application layout
 * Wraps the content with header, footer, and navigation components
 */
const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      {/* Using main Header from App.tsx */}
      
      <main className="app-content">
        <Outlet />
      </main>
      
      <footer className="app-footer">
        {/* Footer components will be added here */}
      </footer>
    </div>
  );
};

export default MainLayout; 