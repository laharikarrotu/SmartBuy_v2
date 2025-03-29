import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss';

interface Product extends BaseProduct {
  brand: string;
  model: string;
  storage: string[];
  colors: string[];
  screenSize: string;
  features: string[];
}

// Fallback image for when a smartphone image fails to load
const getSmartphoneFallbackImage = (id: string) => {
  return `/images/placeholders/smartphone.svg`;
};

const smartphones: Product[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    storage: ['128GB', '256GB', '512GB', '1TB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    screenSize: '6.1"',
    features: ['A17 Pro Chip', 'Pro Camera System', 'Dynamic Island', 'USB-C'],
    originalPrice: 999.00,
    price: 999.00,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6507/6507473_sd.jpg;maxHeight=400;maxWidth=448;format=webp',
    category: 'electronics',
    description: 'The most powerful iPhone with a pro camera system and the A17 Pro chip',
    rating: 4.8,
    reviews: 324,
    inStock: true
  },
  {
    id: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    screenSize: '6.8"',
    features: ['Snapdragon 8 Gen 3', '200MP Camera', 'S Pen', 'Galaxy AI'],
    originalPrice: 1199.99,
    price: 1199.99,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6582/6582841_sd.jpg;maxHeight=427;maxWidth=640',
    category: 'electronics',
    description: 'Flagship smartphone with advanced Galaxy AI features and a powerful camera system',
    rating: 4.7,
    reviews: 247,
    inStock: true
  },
  {
    id: 'google-pixel-8',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    screenSize: '6.7"',
    features: ['Google Tensor G3', 'Improved Camera System', 'Google AI', 'Super Actua Display'],
    originalPrice: 999.00,
    price: 849.00,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6580/6580453_sd.jpg;maxHeight=427;maxWidth=640',
    category: 'electronics',
    description: 'The most refined Pixel with an advanced camera and Google AI features',
    rating: 4.6,
    reviews: 189,
    inStock: true
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    model: 'OnePlus 12',
    storage: ['256GB', '512GB'],
    colors: ['Silky Black', 'Eternal Green'],
    screenSize: '6.82"',
    features: ['Snapdragon 8 Gen 3', 'Hasselblad Camera', '100W Fast Charging', 'LPTO AMOLED'],
    originalPrice: 899.99,
    price: 799.99,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6554/6554719_sd.jpg;maxHeight=427;maxWidth=640',
    category: 'electronics',
    description: 'Fast and smooth flagship with incredible battery life and charging speed',
    rating: 4.7,
    reviews: 156,
    inStock: true
  },
  {
    id: 'motorola-edge-40',
    name: 'Motorola Edge 40 Pro',
    brand: 'Motorola',
    model: 'Edge 40 Pro',
    storage: ['256GB', '512GB'],
    colors: ['Interstellar Black', 'Lunar Blue'],
    screenSize: '6.67"',
    features: ['Snapdragon 8 Gen 2', '50MP Camera System', '125W Fast Charging', 'Water Resistant'],
    originalPrice: 899.99,
    price: 699.99,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6509/6509837_sd.jpg;maxHeight=427;maxWidth=640',
    category: 'electronics',
    description: 'Premium smartphone with flagship specs at a competitive price',
    rating: 4.5,
    reviews: 102,
    inStock: true
  },
  {
    id: 'nothing-phone-2',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    model: 'Phone (2)',
    storage: ['128GB', '256GB'],
    colors: ['White', 'Dark Gray'],
    screenSize: '6.7"',
    features: ['Snapdragon 8+ Gen 1', 'Glyph Interface', 'Clean Software', '50MP Dual Camera'],
    originalPrice: 699.00,
    price: 599.00,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6569/6569855_sd.jpg;maxHeight=900;maxWidth=600',
    category: 'electronics',
    description: 'Unique smartphone with a distinctive design and Glyph interface',
    rating: 4.3,
    reviews: 78,
    inStock: true
  }
];

const Smartphones: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(smartphones.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'storage',
      label: 'Storage',
      options: ['all', ...new Set(smartphones.flatMap(p => p.storage))],
      getValue: (product) => product.storage
    },
    {
      name: 'color',
      label: 'Color',
      options: ['all', ...new Set(smartphones.flatMap(p => p.colors))],
      getValue: (product) => product.colors
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $700', '$700-$1000', 'Over $1000'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $700': return price < 700;
            case '$700-$1000': return price >= 700 && price <= 1000;
            case 'Over $1000': return price > 1000;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Smartphones"
      description="Discover the latest and greatest smartphones"
      products={smartphones}
      filters={filters}
      className="smartphones-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Smartphones; 