import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './InStore.scss';

// Define the product data structure
interface Product {
  id: number;
  name: string;
  reviews: number;
  price: number;
  originalPrice?: number;
  promotions: string[];
  image: string;
  location: string;
  isNew?: boolean;
}

// Sample products data
const storeProducts: Product[] = [
  {
    id: 101,
    name: "Wiggles & Wags Bacon & Cheese Meaty Sticks Dog Treats 6 OZ",
    reviews: 431,
    price: 6.99,
    promotions: [
      "$10 back in savings (5,000 points) when you spend $50+ on merchandise",
      "Extra 20% off online only with code SAVE20, see terms"
    ],
    image: "https://s7d2.scene7.com/is/image/PetSmart/5349460?$sclp-prd-main_large$&fmt=webp&qlt=80",
    location: "Aisle 5, Section B",
    isNew: false
  },
  {
    id: 102,
    name: "Pork Chomps™ Rawhide Free Bone Dog Treat",
    reviews: 308,
    price: 2.79,
    originalPrice: 3.99,
    promotions: [
      "$10 back in savings (5,000 points) when you spend $50+",
      "Buy 2, Get the 3rd 50% Off Select Dog Treats!"
    ],
    image: "https://s7d2.scene7.com/is/image/PetSmart/5264876?$sclp-prd-main_large$&fmt=webp&qlt=80",
    location: "Aisle 3, Section C",
    isNew: false
  },
  {
    id: 103,
    name: "Wiggles & Wags Peanut Butter Chewy Bones Dog Treats 6 OZ",
    reviews: 383,
    price: 6.99,
    promotions: [
      "$10 back in savings (5,000 points) when you spend $50+",
      "Extra 20% off online only with code SAVE20, see terms"
    ],
    image: "https://s7d2.scene7.com/is/image/PetSmart/5349455?$sclp-prd-main_large$&fmt=webp&qlt=80",
    location: "Aisle 4, Section A",
    isNew: true
  },
  {
    id: 104,
    name: "Pork Chomps™ Rawhide-Free Meaty Skewers Dog Treat",
    reviews: 91,
    price: 3.99,
    originalPrice: 6.99,
    promotions: [
      "$10 back in savings (5,000 points) when you spend $50+",
      "Buy 2, Get the 3rd 50% Off Select Dog Treats!"
    ],
    image: "https://s7d2.scene7.com/is/image/PetSmart/5279234?$sclp-prd-main_large$&fmt=webp&qlt=80",
    location: "Aisle 2, Section D",
    isNew: true
  }
];

const InStore: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const popularProducts = storeProducts.filter(product => !product.isNew);
  const newProducts = storeProducts.filter(product => product.isNew);

  // Listen for the custom event from NavAssistant
  useEffect(() => {
    const handleShowRecommendations = () => {
      setShowRecommendations(true);
    };
    
    document.addEventListener('showInstoreRecommendations', handleShowRecommendations);
    
    return () => {
      document.removeEventListener('showInstoreRecommendations', handleShowRecommendations);
    };
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product,
        category: 'instore'
      } 
    });
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: 'clothing',
      description: product.name,
      inStock: true,
      brand: '',
      rating: 0,
      reviews: product.reviews,
      features: [],
      specifications: {},
      originalPrice: product.originalPrice
    });
  };

  return (
    <div className="instore-page">
      {showRecommendations ? (
        <div className="recommendations">
          <section className="products-section">
            <h2>Popular Picks</h2>
            <div className="products-grid">
              {popularProducts.map(product => (
                <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-reviews">
                      <span className="stars">{'★'.repeat(4)}</span>
                      <span className="review-count">({product.reviews})</span>
                    </div>
                    <div className="product-price">
                      {product.originalPrice ? (
                        <>
                          <span className="current-price">${product.price.toFixed(2)}</span>
                          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="current-price">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="product-location highlighted">
                      <span className="location-icon">📍</span>
                      <span className="location-text">{product.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="products-section">
            <h2>New Arrivals</h2>
            <div className="products-grid">
              {newProducts.map(product => (
                <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="new-badge">NEW</div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-reviews">
                      <span className="stars">{'★'.repeat(4)}</span>
                      <span className="review-count">({product.reviews})</span>
                    </div>
                    <div className="product-price">
                      {product.originalPrice ? (
                        <>
                          <span className="current-price">${product.price.toFixed(2)}</span>
                          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="current-price">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="product-location highlighted">
                      <span className="location-icon">📍</span>
                      <span className="location-text">{product.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h2>Ask our AI assistant for help finding products in store</h2>
          <p>Try asking: "I am in the store to pick up a treat for my lab, make some recommendations"</p>
        </div>
      )}
    </div>
  );
};

export default InStore;
