import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecentlyViewed } from '../../contexts/RecentlyViewedContext';
import './RecentlyViewed.scss';

const RecentlyViewed: React.FC = () => {
  const { recentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="recently-viewed">
      <h2>Recently Viewed</h2>
      <div className="recently-viewed-grid">
        {recentlyViewed.map((product) => (
          <div 
            key={product.id} 
            className="recently-viewed-item"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="product-meta">
                {product.rating && (
                  <div className="rating">
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="rating-number">{product.rating}</span>
                    {product.reviews && (
                      <span className="reviews">({product.reviews})</span>
                    )}
                  </div>
                )}
                <div className="price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed; 