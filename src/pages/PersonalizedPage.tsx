import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useCart, CartItem as ContextCartItem } from '../contexts/CartContext';
import './PersonalizedPage.scss';

type ProductCategory = 'food' | 'toys' | 'treats' | 'supplies';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  category: ProductCategory;
  autoshipDiscount: number;
}

interface ComboDeal {
  id: number;
  title: string;
  products: Product[];
  totalPrice: number;
  originalPrice: number;
  savings: number;
  category: string;
}

interface RecommendationSection {
  title: string;
  reason: string;
  products: Product[];
}

export default function PersonalizedPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const { addToCart, items: cartItems } = useCart();
  const [personalizedProducts, setPersonalizedProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendationSection[]>([]);
  const [comboDeals, setComboDeals] = useState<ComboDeal[]>([]);

  const mockPersonalizedProducts: Product[] = [
    {
      id: 1,
      name: "Royal Canin® Size Health Nutrition Mini Adult Dog Food",
      price: 54.99,
      originalPrice: 64.99,
      image: "https://s7d2.scene7.com/is/image/PetSmart/5173207?$sclp-prd-main_large$",
      description: "Premium nutrition tailored for small breed adult dogs",
      rating: 4.8,
      reviews: 2453,
      category: 'food' as ProductCategory,
      autoshipDiscount: 35
    },
    {
      id: 2,
      name: "Purina Pro Plan® Focus Adult Sensitive Skin & Stomach",
      price: 69.99,
      originalPrice: 79.99,
      image: "https://s7d2.scene7.com/is/image/PetSmart/5279401?$sclp-prd-main_large$",
      description: "Specialized formula for sensitive dogs",
      rating: 4.7,
      reviews: 1876,
      category: 'food' as ProductCategory,
      autoshipDiscount: 35
    },
    {
      id: 3,
      name: "KONG® Extreme Dog Toy - Treat Dispensing",
      price: 14.99,
      originalPrice: 22.99,
      image: "https://s7d2.scene7.com/is/image/PetSmart/5137081?$sclp-prd-main_large$",
      description: "Durable treat-dispensing toy for extreme chewers",
      rating: 4.9,
      reviews: 3242,
      category: 'toys' as ProductCategory,
      autoshipDiscount: 35
    },
    {
      id: 4,
      name: "Top Paw® Double Door Wire Dog Crate",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://s7d2.scene7.com/is/image/PetSmart/5298297?$sclp-prd-main_large$",
      description: "Durable wire crate with double door access",
      rating: 4.6,
      reviews: 1523,
      category: 'supplies' as ProductCategory,
      autoshipDiscount: 35
    },
    {
      id: 5,
      name: "Greenies® Original Regular Dental Dog Treats",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://s7d2.scene7.com/is/image/PetSmart/5290431?$sclp-prd-main_large$",
      description: "Vet-recommended dental chews",
      rating: 4.8,
      reviews: 2891,
      category: 'treats' as ProductCategory,
      autoshipDiscount: 35
    }
  ];

  // Sample combo deals
  const sampleComboDeals: ComboDeal[] = [
    {
      id: 1,
      title: "Puppy Starter Kit",
      products: [
        {
          id: 3,
          name: "KONG® Extreme Dog Toy - Treat Dispensing",
          price: 14.99,
          originalPrice: 22.99,
          image: "https://s7d2.scene7.com/is/image/PetSmart/5137081?$sclp-prd-main_large$",
          description: "Durable treat-dispensing toy for extreme chewers",
          rating: 4.9,
          reviews: 3242,
          category: 'toys' as ProductCategory,
          autoshipDiscount: 35
        },
        {
          id: 6,
          name: "Nylabone® Puppy Chew Toy Bundle",
          price: 19.99,
          originalPrice: 29.99,
          image: "https://s7d2.scene7.com/is/image/PetSmart/5291924?$sclp-prd-main_large$",
          description: "Perfect for teething puppies",
          rating: 4.7,
          reviews: 1523,
          category: 'toys' as ProductCategory,
          autoshipDiscount: 35
        }
      ],
      totalPrice: 29.99,
      originalPrice: 52.98,
      savings: 22.99,
      category: "puppy"
    }
  ];

  // Generate recommendations based on cart items
  useEffect(() => {
    if (cartItems.length > 0) {
      const lastAddedItem = cartItems[cartItems.length - 1];
      
      // Get category-based recommendations
      const categoryRecommendations = mockPersonalizedProducts.filter(
        product => product.id.toString() !== lastAddedItem.id
      );

      // Get complementary products
      const complementaryProducts = mockPersonalizedProducts.filter(
        product => product.id.toString() !== lastAddedItem.id
      );

      setRecommendedProducts([
        {
          title: "Similar Products",
          reason: `Based on ${lastAddedItem.name} in your cart`,
          products: categoryRecommendations.slice(0, 3)
        },
        {
          title: "Frequently Bought Together",
          reason: "Perfect companions for your recent addition",
          products: complementaryProducts.slice(0, 3)
        }
      ]);
    }
  }, [cartItems]);

  useEffect(() => {
    setPersonalizedProducts(mockPersonalizedProducts);
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/personalized/${product.id}`, { 
      state: { product, isPersonalized: true }
    });
  };

  const filteredProducts = selectedCategory === 'all' 
    ? personalizedProducts 
    : personalizedProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="personalized-page">
      <div className="promo-banner">
        <a href="#">Get 10% IN SAVINGS (5X pts) on products, services or donations thru 2/9* ›</a>
      </div>

      <div className="hero-section">
        <h1>Personalized for Your Pet</h1>
        <p>Recommendations based on your pet's needs and preferences</p>
      </div>

      <div className="treats-rewards-banner">
        <div className="banner-content">
          <div className="rewards-icon">🏆</div>
          <div className="rewards-text">
            <h3>Treats™ members earn points on every purchase</h3>
            <p>Plus, get member pricing and exclusive offers</p>
          </div>
          {!isAuthenticated && (
            <button onClick={() => loginWithPopup()} className="join-btn">Join Now</button>
          )}
        </div>
      </div>

      <div className="category-filters">
        <button 
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${selectedCategory === 'food' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('food')}
        >
          Food
        </button>
        <button 
          className={`filter-btn ${selectedCategory === 'toys' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('toys')}
        >
          Toys
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            data-product-id={product.id}
            onClick={() => handleProductClick(product)}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="autoship-badge">
                Save {product.autoshipDiscount}% with Autoship
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <div className="product-meta">
                <div className="rating">
                  <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                  <span className="rating-number">{product.rating}</span>
                  <span className="reviews">({product.reviews})</span>
                </div>
                <div className="price-container">
                  <div className="original-price">${product.originalPrice}</div>
                  <div className="current-price">${product.price}</div>
                  <div className="autoship-price">
                    ${(product.price * (1 - product.autoshipDiscount/100)).toFixed(2)} with Autoship
                  </div>
                </div>
              </div>
              <div className="points-earned">
                Earn {Math.floor(product.price * 10)} points with purchase
              </div>
              <button 
                className="add-to-cart"
                onClick={(e) => {
                  e.stopPropagation();
                  const cartItem: ContextCartItem = {
                    id: product.id.toString(),
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    category: 'dog',
                    description: product.description,
                    rating: product.rating,
                    reviews: product.reviews,
                    inStock: true,
                    brand: "SmartPet"
                  };
                  addToCart(cartItem);
                }}
              >
                Add to Cart
              </button>
              <button className="autoship-btn">
                Autoship & Save {product.autoshipDiscount}%
              </button>
            </div>
          </div>
        ))}
      </div>

      {recommendedProducts.length > 0 && (
        <div className="recommendations-section">
          {recommendedProducts.map((section, index) => (
            <div key={index} className="recommendation-group">
              <div className="section-header">
                <h2>{section.title}</h2>
                <p className="reason">{section.reason}</p>
              </div>
              <div className="products-grid">
                {section.products.map(product => (
                  <div 
                    key={product.id} 
                    className="product-card"
                    data-product-id={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="autoship-badge">
                        Save {product.autoshipDiscount}% with Autoship
                      </div>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="description">{product.description}</p>
                      <div className="product-meta">
                        <div className="rating">
                          <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                          <span className="rating-number">{product.rating}</span>
                          <span className="reviews">({product.reviews})</span>
                        </div>
                        <div className="price-container">
                          <div className="original-price">${product.originalPrice}</div>
                          <div className="current-price">${product.price}</div>
                          <div className="autoship-price">
                            ${(product.price * (1 - product.autoshipDiscount/100)).toFixed(2)} with Autoship
                          </div>
                        </div>
                      </div>
                      <div className="points-earned">
                        Earn {Math.floor(product.price * 10)} points with purchase
                      </div>
                      <button 
                        className="add-to-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          const cartItem: ContextCartItem = {
                            id: product.id.toString(),
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                            category: 'dog',
                            description: product.description,
                            rating: product.rating,
                            reviews: product.reviews,
                            inStock: true,
                            brand: "SmartPet"
                          };
                          addToCart(cartItem);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button className="autoship-btn">
                        Autoship & Save {product.autoshipDiscount}%
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="combo-deals-section">
        <h2>Special Bundles & Combos</h2>
        <div className="combo-deals-grid">
          {comboDeals.map(deal => (
            <div key={deal.id} className="combo-deal-card">
              <div className="deal-header">
                <h3>{deal.title}</h3>
                <div className="savings-badge">
                  Save ${deal.savings.toFixed(2)}
                </div>
              </div>
              <div className="deal-products">
                {deal.products.map(product => (
                  <div key={product.id} className="mini-product-card">
                    <img src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                  </div>
                ))}
              </div>
              <div className="deal-footer">
                <div className="price-info">
                  <span className="original-price">${deal.originalPrice.toFixed(2)}</span>
                  <span className="deal-price">${deal.totalPrice.toFixed(2)}</span>
                </div>
                <button className="add-bundle-btn">Add Bundle to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isAuthenticated && (
        <div className="login-prompt">
          <div className="prompt-content">
            <h2>Sign in for Better Recommendations</h2>
            <p>Get personalized product suggestions and earn Treats™ points on every purchase</p>
            <button onClick={() => loginWithPopup()}>Sign In</button>
          </div>
        </div>
      )}
    </div>
  );
} 