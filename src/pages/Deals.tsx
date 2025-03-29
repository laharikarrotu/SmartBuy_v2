import React from 'react';
import { useNavigate } from 'react-router-dom';
import './All.scss'; // Reusing the All.scss styles

interface DealItem {
  title: string;
  image: string;
  link: string;
  category?: string;
}

const Deals: React.FC = () => {
  const navigate = useNavigate();
  
  const dealItems: DealItem[] = [
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

  const handleNavigation = (item: DealItem) => {
    navigate(item.link);
  };

  return (
    <div className="home-page">
      <section className="deals-section">
        <h1>Today's Deals & Special Offers</h1>
        <p className="deals-description">Browse our latest deals and limited-time offers across all categories.</p>
        <div className="deals-grid">
          {dealItems.map((deal, index) => (
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
    </div>
  );
};

export default Deals; 