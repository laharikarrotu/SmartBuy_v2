import React from 'react';
import { Link } from 'react-router-dom';
import './pets.scss';

const PetsPage: React.FC = () => {
  const petCategories = [
    {
      id: 'dog',
      name: 'Dog Products',
      description: 'Everything your canine companion needs',
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400',
      link: '/pets/dog'
    },
    {
      id: 'cat',
      name: 'Cat Products',
      description: 'Premium products for your feline friends',
      image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=400',
      link: '/pets/cat'
    },
    {
      id: 'supplies',
      name: 'Pet Supplies',
      description: 'Essential supplies for all your pets',
      image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400',
      link: '/pets/supplies'
    }
  ];

  const featuredProducts = [
    {
      id: 'd1',
      name: 'Premium Dog Food',
      price: 89.99,
      image: 'https://s7d2.scene7.com/is/image/smartbuy/5339575?$sclp-prd-main_large$',
      link: '/product/d1',
      category: 'Dog'
    },
    {
      id: 'cat1',
      name: 'Interactive Cat Toy',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400',
      link: '/product/cat3',
      category: 'Cat'
    },
    {
      id: 'ps5',
      name: 'Pet First Aid Kit',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1583939411023-c1a5592e3069?w=400',
      link: '/product/ps5',
      category: 'Supplies'
    }
  ];

  return (
    <div className="pets-page">
      <div className="container">
        <div className="page-header">
          <h1>Pet Products & Supplies</h1>
          <p>Quality products for your beloved pets</p>
        </div>

        <section className="categories-section">
          <h2>Shop By Pet Category</h2>
          <div className="category-cards">
            {petCategories.map(category => (
              <Link to={category.link} key={category.id} className="category-card">
                <div className="image-container">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="featured-products-section">
          <h2>Featured Pet Products</h2>
          <div className="featured-products">
            {featuredProducts.map(product => (
              <Link to={product.link} key={product.id} className="featured-product">
                <div className="image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <span className="price">${product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pet-care-section">
          <h2>Pet Care Tips</h2>
          <div className="pet-care-cards">
            <div className="pet-care-card">
              <h3>Nutrition</h3>
              <p>Proper nutrition is essential for your pet's health. Choose high-quality food appropriate for their species, age, and health needs.</p>
            </div>
            <div className="pet-care-card">
              <h3>Exercise</h3>
              <p>Regular exercise helps maintain your pet's physical and mental health. Ensure they get appropriate activity for their species and age.</p>
            </div>
            <div className="pet-care-card">
              <h3>Grooming</h3>
              <p>Regular grooming helps keep your pet clean and healthy while strengthening your bond with them.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PetsPage; 