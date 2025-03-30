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
      {/* Header removed to prevent duplication - using main Header from App.tsx */}
      
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
                <li><Link to="/shipping">Shipping & Delivery</Link></li>
                <li><Link to="/returns">Returns & Exchanges</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer__section">
              <h3>About SmartBuy</h3>
              <ul>
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="footer__section">
              <h3>Resources</h3>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/track-order">Track Your Order</Link></li>
                <li><Link to="/gift-cards">Gift Cards</Link></li>
                <li><Link to="/rewards">Rewards Program</Link></li>
              </ul>
            </div>
            <div className="footer__section footer__section--contact">
              <h3>Connect With Us</h3>
              <div className="contact-info">
                <i className="fa fa-phone"></i>
                <span>1-800-SMARTBUY</span>
              </div>
              <div className="contact-info">
                <i className="fa fa-envelope"></i>
                <span>support@smartbuy.com</span>
              </div>
              <div className="social-icons">
                <a href="#" aria-label="Facebook"><i className="fa fa-facebook"></i></a>
                <a href="#" aria-label="Twitter"><i className="fa fa-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i className="fa fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
            <div className="footer__section footer__section--newsletter">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for exclusive deals and updates.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="copyright">
              <p>&copy; {new Date().getFullYear()} SmartBuy. All rights reserved.</p>
            </div>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/accessibility">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 