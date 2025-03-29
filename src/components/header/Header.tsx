import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useCart } from '../../contexts/CartContext';
import { useApp } from '../../contexts/AppContext';

export const Header = () => {
  const location = useLocation();
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();
  const { items } = useCart();
  const { toggleNavAssistant, toggleControlTray } = useApp();
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/pets/dog"
              className={location.pathname.includes('/pets/dog') ? 'active' : ''}
            >
              Products
            </Link>
          </li>
          <li>
            <Link 
              to="/deals"
              className={location.pathname === '/deals' ? 'active' : ''}
            >
              Deals
            </Link>
          </li>
          <li>
            <Link 
              to="/categories"
              className={location.pathname === '/categories' ? 'active' : ''}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link to="/instore" className={location.pathname === '/instore' ? 'active' : ''}>
              InStore
            </Link>
          </li>
          <li>
            <button 
              className="menu-button"
              onClick={toggleNavAssistant}
            >
              Menu
            </button>
          </li>
          <li>
            <Link 
              to="/cart"
              className={location.pathname === '/cart' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                toggleControlTray();
              }}
            >
              Cart {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link 
                  to="/profile"
                  className={location.pathname === '/profile' ? 'active' : ''}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/personalized"
                  className={location.pathname === '/personalized' ? 'active' : ''}
                >
                  Personalized
                </Link>
              </li>
              <li>
                <button 
                  className="auth-button"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <button 
                className="auth-button"
                onClick={() => loginWithPopup()}
              >
                Sign In
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};