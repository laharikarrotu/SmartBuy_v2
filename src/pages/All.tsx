import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './All.scss';

interface CategoryItem {
  name: string;
  image: string;
  link: string;
  productId?: number;
  category?: string;
}
interface PickItem {
  points: string;
  category: string;
  image: string;
  link: string;
  productId?: number;
  targetCategory?: string;
  
}
interface DealItem {
  title: string;
  image: string;
  link: string;
  
  
  category?: string;
}

const PopularPicks: Record<string, PickItem[]> = {
  pet: [
    {
      points: "5X",
      category: "All dog food, any brand",
      image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
     
      targetCategory: "pets",
      link:"/pets/dog"
    },
    {
      points: "5X",
      category: "All cat food & treats, any brand",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwdHJlYXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      targetCategory: "pets",
      link:"/pets/dog"
    }
  ],
  electronics: [
    {
      points: "3X",
      category: "Smartphones & Accessories",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      targetCategory: "electronics",
      link:"/electronics",
    },
    {
      points: "3X",
      category: "Laptops & Computers",
      image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      targetCategory: "electronics",
      link:"/electronics",
    }
  ],
  clothing: [
    {
      points: "2X",
      category: "Men's Fashion",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      targetCategory: "clothing",
      link:"/clothing",
    },
    {
      points: "2X",
      category: "Women's Fashion",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW5zJTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      targetCategory: "clothing",
      link:"/clothing",
    }
  ]
};

const Categories: Record<string, CategoryItem[]> = {
  pet: [
    {
      name: "Dog",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      link: "/pets/dog",
      category: "pets"
    },
    {
      name: "Cat",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      link: "/pets/cat",
      category: "pets"
    }
  ],
  electronics: [
    {
      name: "Smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      link: "/electronics",
      
      category: "electronics"
    },
    {
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      link: "/electronics",
      category: "electronics"
    }
  ],
  clothing: [
    {
      name: "Men",
      image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      link:  "clothing",
      category: "clothing"
    },
    {
      name: "Women",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      link:  "clothing",
      category: "clothing"
    }
  ]
};

const Deals: DealItem[] = [
  {
    title: "Save 30% on select dog toys",
    image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nJTIwdG95c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    link: "/pets/dog",
    
    category: "pets"
  },
  {
    title: "Buy 1, Get 1 50% off cat treats",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwdHJlYXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/pets/cat",
    
    category: "pets"
  },
  {
    title: "Up to 40% off selected smartphones",
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0cGhvbmVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/electronics",
    
    category: "electronics"
  },
  {
    title: "Headphones - Buy one get 30% off second pair",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    link: "/electronics",
    
    category: "electronics"
  },
  {
    title: "Spring Collection - 25% off new arrivals",
    image: "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNwcmluZyUyMGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/clothing",
    
    category: "clothing"
  },
  {
    title: "Clearance - Up to 70% off winter styles",
    image: "https://images.unsplash.com/photo-1515434126000-961d90ff09db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdpbnRlciUyMGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/clothing",
    
    category: "clothing"
  }
];

const AllCategories = [
  ...Categories.pet,
  ...Categories.electronics,
  ...Categories.clothing
];
const All: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popCategoryPicksTitle, setPopCategoryPicksTitle] = useState("All Departments");
  
  // New states for footer detail sections
  const [showCustomerService, setShowCustomerService] = useState(false);
  const [showAboutSmartBuy, setShowAboutSmartBuy] = useState(false);
  const [showResources, setShowResources] = useState(false);
  
  useEffect(() => {
    if (activeTab === "pet") {
      setPopCategoryPicksTitle("Pets");
    } else if (activeTab === "electronics") {
      setPopCategoryPicksTitle("Electronics");
    } else if (activeTab === "clothing") {
      setPopCategoryPicksTitle("Clothing");
    } else {
      setPopCategoryPicksTitle("All Departments");
    }
  }, [activeTab]);
  
  // Toggle functions for footer sections
  const toggleCustomerService = () => {
    setShowCustomerService(!showCustomerService);
    setShowAboutSmartBuy(false);
    setShowResources(false);
  };

  const toggleAboutSmartBuy = () => {
    setShowAboutSmartBuy(!showAboutSmartBuy);
    setShowCustomerService(false);
    setShowResources(false);
  };

  const toggleResources = () => {
    setShowResources(!showResources);
    setShowCustomerService(false);
    setShowAboutSmartBuy(false);
  };
  
 
  const filteredDeals = activeTab === "all" 
    ? Deals 
    : Deals.filter(deal => deal.category === activeTab);

  const getPopularPicks = () => {
    if (activeTab === "all") {
      return [
        ...PopularPicks.pet.slice(0, 1),
        ...PopularPicks.electronics.slice(0, 1),
        ...PopularPicks.clothing.slice(0, 2)
      ];
    } else {
      return PopularPicks[activeTab as keyof typeof PopularPicks] || [];
    }
  };

  const getCategories = () => {
    if (activeTab === "all") {
      return AllCategories;
    } else {
      return Categories[activeTab as keyof typeof Categories] || [];
    }
  };
  
  const handleNavigation = (item: any) => {
    if (item.productId) {
      // Map internal category names to URL paths
      let urlCategory = item.targetCategory || item.category || '';
      
      // Default mapping based on product ID if no category is provided
      if (!urlCategory) {
        if (item.productId >= 100 && item.productId < 200) {
          urlCategory = 'electronics';
        } else if (item.productId >= 200) {
          urlCategory = 'clothing';
        } else {
          urlCategory = 'pets';
        }
      }
      
      // For product detail routes, make sure we're using the right URL structure
      navigate(`/${urlCategory}/${item.productId}`, {
        state: {
          product: { id: item.productId },
          category: urlCategory
        }
      });
    } else {
      // For non-product links, just navigate to the specified link
      navigate(item.link || '/pets/dog');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  if (loading) return <div className="loading-message">Loading products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  return (
    <div className="home-page">
 
      <header className="site-header">
        <div className="header-container">
          <div className="logo-container">
            <img src="/smartbuy-logo.svg" alt="SmartBuy Logo" className="site-logo" />
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <a href="#" 
                  className={activeTab === "all" ? "active" : ""} 
                  onClick={(e) => { e.preventDefault(); handleTabChange("all"); }}
                >
                  All Departments
                </a>
              </li>
              <li>
                <a href="#" 
                  className={activeTab === "pet" ? "active" : ""} 
                  onClick={(e) => { e.preventDefault(); handleTabChange("pet"); }}
                >
                  Pets
                </a>
              </li>
              <li>
                <a href="#" 
                  className={activeTab === "electronics" ? "active" : ""} 
                  onClick={(e) => { e.preventDefault(); handleTabChange("electronics"); }}
                >
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" 
                  className={activeTab === "clothing" ? "active" : ""} 
                  onClick={(e) => { e.preventDefault(); handleTabChange("clothing"); }}
                >
                  Clothing
                </a>
              </li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/pets/dog'); }}>Today's Deals</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button className="search-btn">
              <i className="search-icon">🔍</i>
            </button>
            <button className="account-btn">Account</button>
            <button className="cart-btn">Cart (0)</button>
          </div>
        </div>
      </header>
 
      <section className="popular-picks">
        <h2>Popular Categories in {popCategoryPicksTitle}</h2>
        <div className="picks-grid">
          {getPopularPicks().map((pick, index) => (
            <div 
              key={`pick-${index}`} 
              className="pick-card"
              onClick={() => handleNavigation(pick)}
            >
              <div className="points-badge">
                <span className="points">{pick.points}</span>
                <span className="pts">pts</span>
              </div>
              <div className="pick-content">
                <h3>{pick.category}</h3>
                <img src={pick.image} alt={pick.category} />
              </div>
            </div>
          ))}
        </div>
      </section>
  
      <section className="shop-by-category">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {getCategories().map((category, index) => (
            <div 
              key={`category-${index}`} 
              className="category-card"
              onClick={() => handleNavigation(category)}
            >
              <div className="image-container">
                <img src={category.image} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="deals-section">
        <h2>Hot Deals & Offers</h2>
        <div className="deals-grid">
          {filteredDeals.map((deal, index) => (
            <div 
              key={`deal-${index}`} 
              className="deal-card" 
              onClick={() => handleNavigation(deal)}
            >
              <div className="deal-image">
                <img src={deal.image} alt={deal.title} />
              </div>
              <div className="deal-content">
                <h3>{deal.title}</h3>
                <button 
                  className="shop-now-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(deal);
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
     
      <section className="newsletter-signup">
        <div className="signup-content">
          <h2>Get SmartBuy News & Offers</h2>
          <p>Sign up to receive updates, special offers, shopping tips and more!</p>
          <form className="signup-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>
     
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3 onClick={toggleCustomerService} className="footer-toggle">Customer Service</h3>
            {showCustomerService && (
              <div className="footer-detail-section">
                <h4>How We Can Help You</h4>
                <p>Our Customer Service team is available 24/7 to assist you with any questions or concerns about your orders, shipping, returns, and more.</p>
                <p>Contact us by phone: 1-800-SMARTBUY</p>
                <p>Email: support@smartbuy.com</p>
                <p>Live Chat: Available on our website Monday-Friday, 8AM-8PM ET</p>
              </div>
            )}
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/order-status">Order Status</a></li>
              <li><a href="/shipping">Shipping</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 onClick={toggleAboutSmartBuy} className="footer-toggle">About SmartBuy</h3>
            {showAboutSmartBuy && (
              <div className="footer-detail-section">
                <h4>Who We Are</h4>
                <p>Founded in 2010, SmartBuy has grown to become one of the leading e-commerce platforms in the country.</p>
                <p>Our mission is to provide customers with quality products at competitive prices, while offering an exceptional shopping experience.</p>
                <p>We currently have over 50 physical stores nationwide and ship to all 50 states.</p>
              </div>
            )}
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/stores">Store Locator</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 onClick={toggleResources} className="footer-toggle">Resources</h3>
            {showResources && (
              <div className="footer-detail-section">
                <h4>Helpful Resources</h4>
                <p>Explore our blog for product reviews, buying guides, and the latest trends in shopping.</p>
                <p>Download our mobile app for exclusive deals and easy shopping on the go.</p>
                <p>Join SmartBuy Rewards to earn points on every purchase and unlock special perks and discounts.</p>
              </div>
            )}
            <ul>
              <li><a href="/blog">SmartBuy Blog</a></li>
              <li><a href="/app">Download Our App</a></li>
              <li><a href="/gift-cards">Gift Cards</a></li>
              <li><a href="/rewards">SmartBuy Rewards</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📸</a>
              <a href="#" className="social-icon">🐦</a>
            </div>
            <p>Download Our App</p>
            <div className="app-buttons">
              <a href="#" className="app-button">App Store</a>
              <a href="#" className="app-button">Google Play</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 SmartBuy. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default All;