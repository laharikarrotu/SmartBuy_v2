import React from 'react';
import { useLocation } from 'react-router-dom';
import './CompareProducts.scss';

const CompareProducts: React.FC = () => {
  const location = useLocation();
  const { productIds } = location.state || {};

  return (
    <div className="compare-products">
      <h1>Compare Products</h1>
      <div className="compare-info">
        <p>Comparing {productIds?.length || 0} products</p>
      </div>
      <div className="comparison-container">
        <p>Product comparison will be displayed here.</p>
      </div>
    </div>
  );
};

export default CompareProducts; 