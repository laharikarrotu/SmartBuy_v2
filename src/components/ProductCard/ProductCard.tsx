import React from 'react';
import './ProductCard.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'clothing' | 'electronics' | 'dog' | 'cat';
  description: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  tag?: string;
  type?: string;
  colors?: string[];
  sizes?: string[];
  shipping?: string;
}

interface ProductCardProps {
  product: Product;
  onProductClick: () => void;
  onAddToCart: () => void;
  showDiscount?: boolean;
  showRating?: boolean;
  showBrand?: boolean;
  tag?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onAddToCart,
  showDiscount = true,
  showRating = true,
  showBrand = true,
  tag
}) => {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToCart();
  };

  return (
    <div className="product-card" onClick={onProductClick}>
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {showDiscount && product.originalPrice && discountPercentage > 0 && (
          <div className="product-card__discount">
            {discountPercentage}% OFF
          </div>
        )}
        {(tag || product.tag) && (
          <div className={`product-card__tag product-card__tag--${(tag || product.tag || '').toLowerCase().replace(/\s+/g, '-')}`}>
            {tag || product.tag}
          </div>
        )}
      </div>
      <div className="product-card__content">
        {showBrand && product.brand && (
          <div className="product-card__brand">{product.brand}</div>
        )}
        <h3 className="product-card__title">{product.name}</h3>
        {showRating && product.rating && (
          <div className="product-card__rating">
            <div className="stars">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 >= 0.5 ? '½' : ''}
              {'☆'.repeat(5 - Math.ceil(product.rating))}
            </div>
            <span className="reviews">({product.reviews || 0})</span>
          </div>
        )}
        <div className="product-card__price">
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className="current-price">${product.price.toFixed(2)}</span>
        </div>
        <button 
          className="product-card__add-to-cart" 
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
          title="Add to Cart"
        >
          <span className="icon">🛒</span> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 