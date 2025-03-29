import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toggleNavAssistant, toggleControlTray } = useApp();

  return (
    <div className="app">
      <header className="header">
        <div className="header__container">
          <div className="header__left">
            <Link to="/" className="header__logo">
              SmartBuy
            </Link>
            <nav className="header__nav">
              <Link to="/" className="header__nav-item">Home</Link>
              <Link to="/deals" className="header__nav-item">Deals</Link>
              <Link to="/categories" className="header__nav-item">Categories</Link>
            </nav>
          </div>
          <div className="header__right">
            <button className="header__action" onClick={toggleNavAssistant}>
              Menu
            </button>
            <button className="header__action" onClick={toggleControlTray}>
              Cart
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div className="footer__section">
              <h3>Customer Service</h3>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/shipping">Shipping</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer__section">
              <h3>About SmartBuy</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="footer__section">
              <h3>Resources</h3>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/track-order">Track Order</Link></li>
                <li><Link to="/gift-cards">Gift Cards</Link></li>
                <li><Link to="/rewards">Rewards</Link></li>
              </ul>
            </div>
            <div className="footer__section">
              <h3>Connect With Us</h3>
              <div className="footer__social">
                <a href="#" className="footer__social-link">Facebook</a>
                <a href="#" className="footer__social-link">Twitter</a>
                <a href="#" className="footer__social-link">Instagram</a>
                <a href="#" className="footer__social-link">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; 2024 SmartBuy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 