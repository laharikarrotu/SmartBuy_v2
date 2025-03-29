import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <div className="not-found__actions">
        <Link to="/" className="not-found__link">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 