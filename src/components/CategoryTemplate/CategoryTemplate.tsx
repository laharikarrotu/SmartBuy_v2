import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, CartItem } from '../../contexts/CartContext';
import ProductCard from '../ProductCard/ProductCard';
import './CategoryTemplate.scss';

// Updated version: v1.1.0 - Added improved filtering for undefined values

// Generic product interface that covers most product types
export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'clothing' | 'electronics' | 'dog' | 'cat'; // Match the category types used in the app
  description: string;
  inStock: boolean;
  brand?: string;
  rating?: number;
  reviews?: number;
  [key: string]: any; // For any additional properties specific to a product type
}

export interface Filter {
  name: string;
  label: string;
  options: string[];
  getValue?: (product: BaseProduct) => string | string[] | undefined;
  getFilteredProducts?: (products: BaseProduct[], selectedValue: string) => BaseProduct[];
}

interface CategoryTemplateProps {
  title: string;
  description: string;
  products: BaseProduct[];
  filters: Filter[];
  className?: string;
  basePath?: string;
  showRating?: boolean;
  showBrand?: boolean;
  showDiscount?: boolean;
  mapToCartItem?: (product: BaseProduct) => Partial<CartItem>;
}

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({
  title,
  description,
  products,
  filters,
  className = '',
  basePath = '/product',
  showRating = true,
  showBrand = true,
  showDiscount = true,
  mapToCartItem
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    filters.reduce((acc, filter) => ({ ...acc, [filter.name]: 'all' }), {})
  );
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleProductClick = (productId: string, product: BaseProduct) => {
    // Navigate to the product detail page with the correct URL pattern: /:category/:id
    navigate(`/${product.category}/${productId}`, {
      state: {
        product,
        category: product.category
      }
    });
  };

  const handleAddToCart = (product: BaseProduct) => {
    // Create a complete product object with fallbacks for any missing properties
    const completeProduct = {
      id: product.id || `product-${Math.random().toString(36).substr(2, 9)}`,
      name: product.name || "Product",
      price: product.price || 0,
      image: product.image || "",
      category: product.category || "clothing",
      description: product.description || product.name || "No description available",
      inStock: product.inStock !== undefined ? product.inStock : true,
      brand: product.brand || "",
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      features: product.features || [],
      specifications: product.specifications || {},
      quantity: 1
    };

    // Add to cart
    addToCart(completeProduct);

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${completeProduct.name} added to cart!`;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilterValues({ ...filterValues, [filterName]: value });
    
    // Update active filters list
    if (value !== 'all') {
      if (!activeFilters.includes(filterName)) {
        setActiveFilters([...activeFilters, filterName]);
      }
    } else {
      setActiveFilters(activeFilters.filter(f => f !== filterName));
    }
  };

  const handleFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Reset select to default after selection
    const value = e.target.value;
    if (value === 'default') return;
    
    const [filterName, filterValue] = value.split('|');
    handleFilterChange(filterName, filterValue);
    
    // Reset the select to the default option
    e.target.value = 'default';
  };

  // Apply all filters to products
  const filteredProducts = products.filter(product => {
    return filters.every(filter => {
      const selectedValue = filterValues[filter.name];
      
      // Skip if "all" is selected
      if (selectedValue === 'all') return true;
      
      // Use custom filter function if provided
      if (filter.getFilteredProducts) {
        return filter.getFilteredProducts([product], selectedValue).length > 0;
      }
      
      // Otherwise use the getValue function to check
      if (filter.getValue) {
        const productValue = filter.getValue(product);
        
        // Handle undefined values
        if (productValue === undefined) return false;
        
        // Handle array values (like colors, sizes, etc.)
        if (Array.isArray(productValue)) {
          return productValue.includes(selectedValue);
        }
        
        // Handle single string values
        return productValue === selectedValue;
      }
      
      // Fallback to direct property access
      return product[filter.name] === selectedValue;
    });
  });

  return (
    <div className={`category-template ${className}`}>
      <div className="container">
        <div className="page-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div className="filters">
          <div className="filter-dropdown">
            <select 
              className="filter-select"
              onChange={handleFilterSelect}
              defaultValue="default"
            >
              <option value="default" disabled>Filter Products</option>
              {filters.map(filter => (
                <optgroup key={filter.name} label={filter.label}>
                  {filter.options.map(option => (
                    <option 
                      key={`${filter.name}-${option}`} 
                      value={`${filter.name}|${option}`}
                    >
                      {option === 'all' ? `All ${filter.label}s` : option}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            
            {/* Display active filters */}
            <div className="active-filters">
              {Object.entries(filterValues).map(([filterName, value]) => {
                if (value === 'all') return null;
                
                const filter = filters.find(f => f.name === filterName);
                if (!filter) return null;
                
                return (
                  <span key={filterName} className="filter-tag">
                    {filter.label}: {value}
                    <button 
                      className="remove-filter"
                      onClick={() => handleFilterChange(filterName, 'all')}
                      aria-label={`Remove ${filter.label} filter`}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={() => handleProductClick(product.id, product)}
                onAddToCart={() => handleAddToCart(product)}
                showDiscount={showDiscount}
                showRating={showRating}
                showBrand={showBrand}
              />
            ))
          ) : (
            <div className="no-products">
              <p>No products found with the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTemplate;