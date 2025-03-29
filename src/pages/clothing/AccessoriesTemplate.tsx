import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss';

interface Product extends BaseProduct {
  type: string;
  colors: string[];
  materials?: string[];
  dimensions?: string;
  brand: string;
  tag?: string;
}

const accessories: Product[] = [
  {
    id: 'leather-belt',
    name: 'Classic Leather Belt',
    type: 'Belt',
    colors: ['Black', 'Brown', 'Tan'],
    materials: ['Genuine Leather'],
    dimensions: '1.5" width',
    originalPrice: 39.95,
    price: 29.00,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400',
    category: 'clothing',
    description: 'Premium leather belt with classic buckle',
    inStock: true,
    brand: 'SmartBuy Accessories',
    rating: 4.4,
    reviews: 87
  },
  {
    id: 'silk-scarf',
    name: 'Silk Patterned Scarf',
    type: 'Scarf',
    colors: ['Blue Pattern', 'Red Pattern', 'Paisley'],
    materials: ['100% Silk'],
    dimensions: '36" x 36"',
    originalPrice: 49.95,
    price: 34.00,
    tag: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1597175323023-2538d8cb46f5?w=400',
    category: 'clothing',
    description: '100% silk scarf with elegant patterns',
    inStock: true,
    brand: 'SmartBuy Accessories',
    rating: 4.7,
    reviews: 42
  },
  {
    id: 'leather-wallet',
    name: 'Bifold Leather Wallet',
    type: 'Wallet',
    colors: ['Black', 'Brown'],
    materials: ['Genuine Leather'],
    dimensions: '4.5" x 3.5"',
    originalPrice: 45.00,
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
    category: 'clothing',
    description: 'Slim profile leather wallet with multiple card slots',
    inStock: true,
    brand: 'SmartBuy Accessories',
    rating: 4.5,
    reviews: 118
  },
  {
    id: 'wool-beanie',
    name: 'Wool Winter Beanie',
    type: 'Hat',
    colors: ['Gray', 'Black', 'Navy', 'Burgundy'],
    materials: ['100% Wool'],
    dimensions: 'One size fits most',
    originalPrice: 29.95,
    price: 19.00,
    tag: '30% off',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400',
    category: 'clothing',
    description: 'Warm wool beanie for cold weather',
    inStock: true,
    brand: 'SmartBuy Winter',
    rating: 4.3,
    reviews: 65
  },
  {
    id: 'leather-gloves',
    name: 'Touchscreen Leather Gloves',
    type: 'Gloves',
    colors: ['Black', 'Brown'],
    materials: ['Leather', 'Cashmere lining'],
    dimensions: 'S/M/L',
    originalPrice: 59.95,
    price: 44.00,
    image: 'https://images.unsplash.com/photo-1584208124013-8ea60c5a3c7b?w=400',
    category: 'clothing',
    description: 'Premium leather gloves with touchscreen capability',
    inStock: true,
    brand: 'SmartBuy Winter',
    rating: 4.6,
    reviews: 92
  },
  {
    id: 'canvas-bag',
    name: 'Canvas Tote Bag',
    type: 'Bag',
    colors: ['Natural', 'Navy', 'Black'],
    materials: ['Cotton Canvas'],
    dimensions: '15" x 16" x 4"',
    originalPrice: 39.95,
    price: 29.00,
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400',
    category: 'clothing',
    description: 'Durable canvas tote bag for everyday use',
    inStock: true,
    brand: 'SmartBuy Basics',
    rating: 4.2,
    reviews: 73
  },
  {
    id: 'woven-hat',
    name: 'Summer Woven Hat',
    type: 'Hat',
    colors: ['Natural', 'White'],
    materials: ['Straw'],
    dimensions: 'M/L',
    originalPrice: 34.95,
    price: 24.00,
    tag: 'Summer Essential',
    image: 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400',
    category: 'clothing',
    description: 'Stylish woven hat perfect for beach days',
    inStock: true,
    brand: 'SmartBuy Summer',
    rating: 4.4,
    reviews: 57
  }
];

const Accessories: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'type',
      label: 'Type',
      options: ['all', ...new Set(accessories.map(p => p.type))],
      getValue: (product) => product.type
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(accessories.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'color',
      label: 'Color',
      options: ['all', ...new Set(accessories.flatMap(p => p.colors))],
      getValue: (product) => product.colors
    },
    {
      name: 'material',
      label: 'Material',
      options: ['all', ...new Set(accessories.flatMap(p => p.materials || []))],
      getValue: (product) => product.materials || []
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $25', '$25 - $40', 'Over $40'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $25': return price < 25;
            case '$25 - $40': return price >= 25 && price <= 40;
            case 'Over $40': return price > 40;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Accessories"
      description="Complete your look with our stylish accessories"
      products={accessories}
      filters={filters}
      className="accessories-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Accessories; 