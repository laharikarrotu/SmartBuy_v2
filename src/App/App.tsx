import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      {/* Add floating bubble elements for background effects */}
      <div className="floating-bubble bubble-1"></div>
      <div className="floating-bubble bubble-2"></div>
      <div className="floating-bubble bubble-3"></div>
      <div className="floating-bubble bubble-4"></div>
      
      {/* Rest of existing app content */}
      <Routes>
        {/* ... existing routes ... */}
      </Routes>
    </Router>
  );
};

export default App; 