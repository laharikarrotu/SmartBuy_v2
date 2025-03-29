import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss';

interface Product extends BaseProduct {
  brand: string;
  type: string;
  compatibility: string[];
  connectionType?: string;
  wireless?: boolean;
  features: string[];
}

const accessories: Product[] = [
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd Generation)',
    brand: 'Apple',
    type: 'Earbuds',
    compatibility: ['iOS', 'Android', 'Windows', 'macOS'],
    connectionType: 'Bluetooth',
    wireless: true,
    features: ['Active Noise Cancellation', 'Transparency mode', 'Spatial Audio', 'H2 chip'],
    originalPrice: 249.00,
    price: 229.00,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
    category: 'electronics',
    description: 'Premium wireless earbuds with advanced features and incredible sound quality',
    rating: 4.8,
    reviews: 327,
    inStock: true
  },
  {
    id: 'samsung-galaxy-watch6',
    name: 'Samsung Galaxy Watch6',
    brand: 'Samsung',
    type: 'Smartwatch',
    compatibility: ['iOS', 'Android'],
    connectionType: 'Bluetooth, Wi-Fi',
    wireless: true,
    features: ['Health tracking', 'Sleep monitoring', 'ECG', 'Google Assistant'],
    originalPrice: 329.99,
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1648478939465-842fa8379b55?w=400',
    category: 'electronics',
    description: 'Advanced smartwatch with comprehensive health tracking and smart features',
    rating: 4.6,
    reviews: 245,
    inStock: true
  },
  {
    id: 'anker-power-bank',
    name: 'Anker 737 Power Bank (PowerCore 24K)',
    brand: 'Anker',
    type: 'Charger',
    compatibility: ['iOS', 'Android', 'Windows', 'macOS'],
    connectionType: 'USB-C, USB-A',
    wireless: false,
    features: ['24000mAh', '140W Output', 'Digital Display', 'Smart Charging'],
    originalPrice: 149.99,
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1662219708409-2b56ce368c5f?w=400',
    category: 'electronics',
    description: 'High-capacity power bank with fast charging capabilities for all your devices',
    rating: 4.7,
    reviews: 186,
    inStock: true
  },
  {
    id: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    type: 'Mouse',
    compatibility: ['Windows', 'macOS', 'Linux'],
    connectionType: 'Bluetooth, USB Receiver',
    wireless: true,
    features: ['8000 DPI', 'Silent Clicks', 'MagSpeed Wheel', 'Multi-device control'],
    originalPrice: 99.99,
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1629429407756-446d1f23ef61?w=400',
    category: 'electronics',
    description: 'Premium wireless mouse with ergonomic design and customizable features',
    rating: 4.9,
    reviews: 304,
    inStock: true
  },
  {
    id: 'sandisk-extreme-portable-ssd',
    name: 'SanDisk Extreme Portable SSD V2',
    brand: 'SanDisk',
    type: 'Storage',
    compatibility: ['Windows', 'macOS', 'Android'],
    connectionType: 'USB-C, USB-A',
    wireless: false,
    features: ['1TB', '1050MB/s', 'IP55 Rating', 'Rugged design'],
    originalPrice: 139.99,
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400',
    category: 'electronics',
    description: 'High-speed portable SSD with rugged design for on-the-go storage',
    rating: 4.7,
    reviews: 219,
    inStock: true
  },
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    type: 'Headphones',
    compatibility: ['iOS', 'Android', 'Windows', 'macOS'],
    connectionType: 'Bluetooth, 3.5mm',
    wireless: true,
    features: ['Industry-leading ANC', '30-hour battery', 'LDAC codec', 'Touch controls'],
    originalPrice: 399.99,
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    category: 'electronics',
    description: 'Premium wireless headphones with best-in-class noise cancellation',
    rating: 4.8,
    reviews: 276,
    inStock: true
  },
  {
    id: 'keychron-k6',
    name: 'Keychron K6 Mechanical Keyboard',
    brand: 'Keychron',
    type: 'Keyboard',
    compatibility: ['Windows', 'macOS', 'iOS', 'Android'],
    connectionType: 'Bluetooth, USB-C',
    wireless: true,
    features: ['65% Layout', 'Hot-swappable', 'RGB Backlight', 'Gateron switches'],
    originalPrice: 99.99,
    price: 84.99,
    image: 'https://images.unsplash.com/photo-1606208427310-213b36d0bc21?w=400',
    category: 'electronics',
    description: 'Compact mechanical keyboard with wireless connectivity and custom options',
    rating: 4.6,
    reviews: 182,
    inStock: true
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
      name: 'compatibility',
      label: 'Compatible With',
      options: ['all', 'iOS', 'Android', 'Windows', 'macOS'],
      getValue: (product) => product.compatibility
    },
    {
      name: 'wireless',
      label: 'Connectivity',
      options: ['all', 'Wireless', 'Wired'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        if (selectedValue === 'Wireless') return products.filter(p => p.wireless);
        if (selectedValue === 'Wired') return products.filter(p => !p.wireless);
        return products;
      }
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $100', '$100-$200', 'Over $200'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $100': return price < 100;
            case '$100-$200': return price >= 100 && price <= 200;
            case 'Over $200': return price > 200;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Electronics Accessories"
      description="Enhance your devices with premium accessories"
      products={accessories}
      filters={filters}
      className="electronics-accessories-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Accessories; 