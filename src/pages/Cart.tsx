import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { getProductImage } from '../services/image.service';
import './Cart.scss';

interface Product {
  id: string;
  name: string;
  quantity: number;
  image: string;
  sizes?: string;
  price: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  color: string;
  size: string;
  fit: string;
  quantity: number;
  image: string;
}

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, setItems } = useCart();
  const navigate = useNavigate();
  const [isAddressComplete, setIsAddressComplete] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' or 'ship'
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const { isAuthenticated, user } = useAuth0();
  const [paymentLink, setPaymentLink] = useState('');
  const [showRewardsDiscount, setShowRewardsDiscount] = useState(false);

  const shippingOptions = [
    { method: 'Same-Day Delivery', cost: 9.99, time: 'Today' },
    { method: 'Curbside Pickup', cost: 0.00, time: 'Ready in 2 hours' },
    { method: 'In-Store Pickup', cost: 0.00, time: 'Ready in 1 hour' },
    { method: 'Standard Shipping', cost: 5.99, time: '2-4 business days' }
  ];

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getShippingCost = () => {
    const selectedOption = shippingOptions.find(option => option.method === selectedShipping);
    return selectedOption ? selectedOption.cost : 0;
  };

  const subtotal = calculateSubtotal();
  const shipping = getShippingCost();
  const tax = subtotal * 0.0825; // 8.25% tax
  const total = subtotal + shipping + tax;

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddressComplete(true);
  };

  const handleEditAddress = () => {
    setIsAddressComplete(false);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShippingSelect = (option: typeof shippingOptions[0]) => {
    setSelectedShipping(option.method);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!phoneNumber) throw new Error('Please enter phone number');
      
      // Simulate sending code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsCodeSent(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send code');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!verificationCode) throw new Error('Please enter verification code');
      
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsVerified(true);
      setError('');
      
      // Show rewards animation
      setShowRewardsDiscount(true);
      setTimeout(() => {
        setShowRewardsDiscount(false);
      }, 1000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code');
    }
  };

  const sendPaymentLink = async () => {
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fakePaymentLink = `https://payment.petsmart.com/${Math.random().toString(36).substring(7)}`;
      setPaymentLink(fakePaymentLink);
      setError('Payment link has been sent to your phone. Click the link below to complete payment.');
    } catch (err) {
      setError('Failed to send payment link. Please try again.');
    }
  };

  const handlePaymentCompletion = async () => {
    try {
      // Save order details
      const orderDetails = {
        cartItems: items,
        shippingAddress,
        selectedShipping,
        total
      };
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsPaymentComplete(true);
      
      // Redirect to confirmation
      setTimeout(() => {
        navigate('/order-payment-confirmation');
      }, 2000);
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  // Pre-saved data for authenticated users
  const savedUserData = {
    shippingAddress: {
      fullName: 'Venu Alla',
      street: '525 Lakehill Way',
      apt: '525',
      city: 'Alpharetta',
      state: 'GA',
      zipCode: '30022',
      phone: '+16172012157'
    },
    shipping: 'Standard Shipping'
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Set shipping address and other data
      setShippingAddress(savedUserData.shippingAddress);
      setSelectedShipping(savedUserData.shipping);
      
      // Automatically set verification status for authenticated users
      setPhoneNumber(savedUserData.shippingAddress.phone);
      setIsVerified(true); // Auto-verify authenticated users
      setIsAddressComplete(true);
    }
  }, [isAuthenticated]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Check if the saved cart is not expired
        if (parsedCart.expiry && new Date().getTime() < parsedCart.expiry) {
          setItems(parsedCart.items);
        } else {
          // Clear expired cart
          localStorage.removeItem('cartItems');
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, [setItems]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      const cartData = {
        items: items,
        expiry: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours expiry
      };
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    }
  }, [items]);

  // Handle remove item
  const handleRemoveItem = (itemId: string) => {
    try {
      removeFromCart(itemId);
      // Update localStorage after removal
      const updatedCart = items.filter(item => item.id !== itemId);
      const cartData = {
        items: updatedCart,
        expiry: new Date().getTime() + (24 * 60 * 60 * 1000)
      };
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Handle quantity update
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    try {
      updateQuantity(itemId, newQuantity);
      // Update localStorage after quantity change
      const updatedCart = items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      const cartData = {
        items: updatedCart,
        expiry: new Date().getTime() + (24 * 60 * 60 * 1000)
      };
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div className="cart-page">
      <h1>my cart</h1>

      <div className="cart-container">
        <div className="cart-items-section">
          <table className="cart-table">
            <thead>
              <tr>
                <th>item</th>
                <th>how to get it</th>
                <th>unit price</th>
                <th>qty</th>
                <th>item total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td className="item-info">
                    <img src={getProductImage(item.image, item.category || 'electronics')} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                    </div>
                  </td>
                  <td>{deliveryMethod === 'pickup' ? 'Pick up in store' : 'Ship to address'}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <select
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    ${(item.price * item.quantity).toFixed(2)}
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="shipping-section">
            <h2>Shipping Address</h2>
            {!isAddressComplete ? (
              <div className="shipping-address-form">
                <form onSubmit={handleSaveAddress}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name*</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="street">Street Address*</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={shippingAddress.street}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="apt">Apt/Suite (optional)</label>
                    <input
                      type="text"
                      id="apt"
                      name="apt"
                      value={shippingAddress.apt}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="form-row three-columns">
                    <div className="form-group">
                      <label htmlFor="city">City*</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">State*</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code*</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="save-address-btn">
                      Save & Continue
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="address-summary">
                <div className="summary-content">
                  <h3>Shipping to:</h3>
                  <p>{shippingAddress.fullName}</p>
                  <p>{shippingAddress.street} {shippingAddress.apt}</p>
                  <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                  <p>{shippingAddress.phone}</p>
                  <button className="edit-address-btn" onClick={() => setIsAddressComplete(false)}>
                    Edit
                  </button>
                </div>
              </div>
            )}

            {/* Shipping Options - only show when address is complete */}
            {isAddressComplete && (
              <div className="shipping-options">
                <h2>Choose Delivery Method</h2>
                <div className="shipping-options-list">
                  {shippingOptions.map((option, index) => (
                    <div 
                      key={index}
                      className={`shipping-option ${selectedShipping === option.method ? 'selected' : ''}`}
                      onClick={() => setSelectedShipping(option.method)}
                    >
                      <div className="option-details">
                        <div className="option-main">
                          <input
                            type="radio"
                            name="shipping"
                            checked={selectedShipping === option.method}
                            onChange={() => setSelectedShipping(option.method)}
                          />
                          <span className="method">{option.method}</span>
                        </div>
                        <div className="option-info">
                          <span className="time">{option.time}</span>
                          <span className="cost">
                            {option.cost === 0 ? 'FREE' : `$${option.cost.toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Merchandise total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {selectedShipping && (
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            )}
            <div className="summary-row">
              <span>Estimated tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Estimated Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="rewards-points">
            <p>Earn {Math.floor(total * 10)} points on this purchase</p>
          </div>

          <div className="charity-donation">
            <h3>PetSmart Charities® Donation</h3>
            <p>Earn 2X points on every donation. Your donation helps pets in need & all while you shop.</p>
            <div className="donation-input">
              <input type="number" defaultValue={1} min={1} />
              <button>Apply</button>
            </div>
          </div>

          <div className="quick-pay-section">
            <h3>Quick Pay</h3>
            {isAuthenticated ? (
              <div className="payment-section">
                {!isPaymentComplete ? (
                  <div className="payment-content">
                    <button 
                      onClick={handlePaymentCompletion}
                      className="wallet-pay-btn"
                    >
                      Complete Payment with Wallet
                    </button>
                  </div>
                ) : (
                  <div className="payment-success">
                    <span className="success-tick">✓</span>
                    <p>Payment Successful!</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="signin-section">
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSendCode}>
                  <div className="phone-input-row">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
                    />
                    <button type="submit">Send Code</button>
                  </div>
                </form>
                {isCodeSent && (
                  <form onSubmit={handleVerifyCode}>
                    <div className="verification-code-row">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter verification code"
                      />
                      <button type="submit">Verify</button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 