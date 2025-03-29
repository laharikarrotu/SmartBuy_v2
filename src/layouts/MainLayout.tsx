import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Main application layout
 * Wraps the content with header, footer, and navigation components
 */
const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        {/* Header components will be added here */}
      </header>
      
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