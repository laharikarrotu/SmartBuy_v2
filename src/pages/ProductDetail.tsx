import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { findProductByCategoryAndId } from '../data/products';
import './ProductDetail.scss';

// Define the product data structure
const productData = [
  {
    id: 1,
    name: "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food",
    sizes: "4 sizes",
    reviews: 2693,
    price: 89.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5339575?$sclp-prd-main_large$"
  },
  {
    id: 2,
    name: "Hill's® Science Diet® Sensitive Stomach & Skin Adult Dry Dog Food",
    sizes: "4 sizes",
    reviews: 768,
    price: 83.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$"
  },
  {
    id: 3,
    name: "Blue Buffalo® Life Protection Formula™ Adult Dry Dog Food",
    sizes: "5 sizes",
    reviews: 937,
    price: 64.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5066968?$sclp-prd-main_large$"
  },
  {
    id: 4,
    name: "Royal Canin Size Health Nutrition Small Breed Adult Dry Dog Food",
    sizes: "2 sizes",
    reviews: 760,
    price: 59.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5173207?$sclp-prd-main_large$"
  }
];

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, id } = useParams<{ category: string; id: string }>();
  const { addToCart } = useCart();
  const { addToSavedItems, isSaved } = useSavedItems();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  
  // Get product from location state or find by ID
  const productFromState = location.state?.product;
  const productFromId = productData.find(p => p.id === Number(id));
  const product = productFromState || productFromId;
  
  const [selectedSize, setSelectedSize] = useState('34 Lb');
  const [quantity, setQuantity] = useState(1);
  const [showRewardsPrompt, setShowRewardsPrompt] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [returnFromAuth, setReturnFromAuth] = useState(false);

  const breadcrumbs = ['Dog', 'Food', 'Dry Food'];

  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate('/dog');
    }
  }, [product, navigate]);

  // Add effect to handle auth state changes
  useEffect(() => {
    if (isAuthenticated && returnFromAuth) {
      setFadeOut(true);
      setTimeout(() => {
        setFadeOut(false);
        setReturnFromAuth(false);
      }, 100); // Adjust timing as needed
    }
  }, [isAuthenticated, returnFromAuth]);

  // Update the handleRewardsResponse function
  const handleRewardsResponse = async (isRewardsMember: boolean) => {
    setShowRewardsPrompt(false);
    
    if (isRewardsMember) {
      setReturnFromAuth(true);
      await loginWithPopup();
    }
  };

  // Show rewards prompt after delay
  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        
        const fadeStartEvent = new CustomEvent('rewardsPromptFade', {
          detail: { action: 'start' }
        });
        document.dispatchEvent(fadeStartEvent);
        
        setTimeout(() => {
          setShowRewardsPrompt(true);
          const promptShowEvent = new CustomEvent('rewardsPromptShow', {
            detail: { visible: true }
          });
          document.dispatchEvent(promptShowEvent);
        }, 300);
      }, 5000);

      return () => {
        clearTimeout(timer);
        setShowRewardsPrompt(false);
        const cleanupEvent = new CustomEvent('rewardsPromptShow', {
          detail: { visible: false }
        });
        document.dispatchEvent(cleanupEvent);
      };
    }
  }, [isAuthenticated]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="back-button">
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Ensure the category is one of the allowed types for CartItem
    const categoryMap: Record<string, 'electronics' | 'clothing' | 'dog' | 'cat'> = {
      electronics: 'electronics',
      clothing: 'clothing',
      dog: 'dog',
      cat: 'cat',
      pets: 'dog', // Default pet categories to 'dog'
      // Add any other mappings as needed
    };
    
    // Get the properly typed category or default to 'electronics'
    const typedCategory = categoryMap[category as string] || 'electronics';
    
    const productToAdd = {
      id: product.id || id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      category: typedCategory, // Using the properly typed category
      description: product.description || product.name,
      inStock: true,
      brand: product.brand || '',
      rating: product.rating || 4.5,
      reviews: product.reviews || 0
    };
    
    addToCart(productToAdd);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productToAdd.name} added to cart!`;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const handleSave = () => {
    addToSavedItems({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews
    });
  };

  return (
    <div className="product-detail-page">
      {showRewardsPrompt && (
        <div className="rewards-prompt-overlay">
          <div className="rewards-prompt">
            <h2>Are you a rewards member?</h2>
            <div className="rewards-buttons">
              <button onClick={() => handleRewardsResponse(true)}>Yes</button>
              <button onClick={() => handleRewardsResponse(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      {/* Top Promo Banner */}
      <div className="promo-banner">
        <a href="#">Get 10% IN SAVINGS (5X pts) on products, services or donations thru 2/9* ›</a>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span>{crumb}</span>
            {index < breadcrumbs.length - 1 && <span className="separator">/</span>}
          </React.Fragment>
        ))}
      </div>

      <div className={`product-container ${fadeOut ? 'fade-out' : ''}`}>
        {/* Left Column - Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
            <span className="zoom-hint">Hover over image to zoom in</span>
          </div>
          <div className="thumbnail-list">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="thumbnail">
                <img src={product.image} alt={product.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <button className="favorite-btn">♡</button>
          </div>

          <div className="brand">
            <span>Item #{product.id}</span>
            <div className="reviews">
              <span className="stars">★★★★½</span>
              <span className="count">{Math.abs(product.reviews)} reviews</span>
            </div>
          </div>

          <div className="price-section">
            <div className="price">${product.price}</div>
            <div className="afterpay">
              or 4 interest-free payments of ${(product.price / 4).toFixed(2)} with <span className="afterpay-logo">afterpay</span> ⓘ
            </div>
          </div>

          <div className="product-options">
            <div className="flavor">
              <h3>Flavor:</h3>
              <div className="option">Salmon & Rice</div>
            </div>

            <div className="size">
              <h3>Size: {selectedSize}</h3>
              <div className="size-options">
                {['6 Lb', '18 Lb', '34 Lb'].map((size) => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pickup-section">
              <h3>Pick up in store</h3>
              <p>Most orders ready within 2 hours</p>
              <div className="store-info">
                <p>In stock at <strong>Melbourne</strong></p>
                <a href="#">Change store</a>
              </div>

              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <button 
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button 
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</button>
                </div>
                <button 
                  className="add-to-cart-btn btn-add-to-cart"
                  onClick={handleAddToCart}
                >
                  <span className="icon">🛒</span> Add to Cart
                </button>
              </div>

              <div className="points-earned">
                <span className="icon">🏷️</span>
                Estimated {quantity * 599} points earned
              </div>

            </div>
          </div>

          <div className="product-actions">
            <button 
              className={`save-button ${isSaved(parseInt(product.id)) ? 'saved' : ''}`}
              onClick={handleSave}
            >
              {isSaved(parseInt(product.id)) ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 