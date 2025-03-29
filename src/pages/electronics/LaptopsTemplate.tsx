import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss';

interface Product extends BaseProduct {
  brand: string;
  model: string;
  processor: string;
  ram: string[];
  storage: string[];
  display: string;
  graphics: string;
  os: string;
  weight: string;
}

const laptops: Product[] = [
  {
    id: 'macbook-pro-14',
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    model: 'MacBook Pro 14 (M3 Pro)',
    processor: 'Apple M3 Pro',
    ram: ['16GB', '32GB', '64GB'],
    storage: ['512GB', '1TB', '2TB', '4TB'],
    display: '14" Liquid Retina XDR',
    graphics: 'Integrated M3 Pro GPU',
    os: 'macOS',
    weight: '3.5 lbs',
    originalPrice: 1999.00,
    price: 1999.00,
    image: 'https://images.unsplash.com/photo-1605542604788-bd8756a0bc4c?w=400',
    category: 'electronics',
    description: 'Powerful MacBook Pro with Apple Silicon M3 Pro chip and stunning display',
    rating: 4.9,
    reviews: 240,
    inStock: true
  },
  {
    id: 'dell-xps-13',
    name: 'Dell XPS 13 Plus',
    brand: 'Dell',
    model: 'XPS 13 Plus',
    processor: 'Intel Core i7-1360P',
    ram: ['16GB', '32GB'],
    storage: ['512GB', '1TB', '2TB'],
    display: '13.4" 3.5K OLED Touch',
    graphics: 'Intel Iris Xe',
    os: 'Windows 11',
    weight: '2.77 lbs',
    originalPrice: 1699.00,
    price: 1499.00,
    image: 'https://images.unsplash.com/photo-1625941299390-c4f882ad1c23?w=400',
    category: 'electronics',
    description: 'Premium ultrabook with edge-to-edge keyboard and OLED display',
    rating: 4.7,
    reviews: 186,
    inStock: true
  },
  {
    id: 'hp-spectre-x360',
    name: 'HP Spectre x360 14"',
    brand: 'HP',
    model: 'Spectre x360 14',
    processor: 'Intel Core i7-1360P',
    ram: ['16GB', '32GB'],
    storage: ['512GB', '1TB', '2TB'],
    display: '14" 3K2K OLED Touch',
    graphics: 'Intel Iris Xe',
    os: 'Windows 11',
    weight: '3.01 lbs',
    originalPrice: 1749.00,
    price: 1349.00,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
    category: 'electronics',
    description: 'Versatile 2-in-1 laptop with stunning OLED display and long battery life',
    rating: 4.6,
    reviews: 154,
    inStock: true
  },
  {
    id: 'lenovo-thinkpad-x1',
    name: 'Lenovo ThinkPad X1 Carbon',
    brand: 'Lenovo',
    model: 'ThinkPad X1 Carbon Gen 11',
    processor: 'Intel Core i7-1365U',
    ram: ['16GB', '32GB'],
    storage: ['512GB', '1TB'],
    display: '14" WUXGA IPS',
    graphics: 'Intel Iris Xe',
    os: 'Windows 11 Pro',
    weight: '2.48 lbs',
    originalPrice: 1849.00,
    price: 1649.00,
    image: 'https://images.unsplash.com/photo-1619112776171-3f06e91cf427?w=400',
    category: 'electronics',
    description: 'Legendary business laptop with exceptional keyboard and durability',
    rating: 4.8,
    reviews: 204,
    inStock: true
  },
  {
    id: 'asus-rog-zephyrus',
    name: 'ASUS ROG Zephyrus G14',
    brand: 'ASUS',
    model: 'ROG Zephyrus G14',
    processor: 'AMD Ryzen 9 7940HS',
    ram: ['16GB', '32GB'],
    storage: ['1TB', '2TB'],
    display: '14" QHD 165Hz',
    graphics: 'NVIDIA RTX 4070',
    os: 'Windows 11',
    weight: '3.64 lbs',
    originalPrice: 1899.00,
    price: 1699.00,
    image: 'https://images.unsplash.com/photo-1605144810229-28afb9123aaf?w=400',
    category: 'electronics',
    description: 'Compact gaming powerhouse with outstanding performance and battery life',
    rating: 4.7,
    reviews: 173,
    inStock: true
  },
  {
    id: 'microsoft-surface-laptop-5',
    name: 'Microsoft Surface Laptop 5',
    brand: 'Microsoft',
    model: 'Surface Laptop 5',
    processor: 'Intel Core i7-1255U',
    ram: ['16GB', '32GB'],
    storage: ['512GB', '1TB'],
    display: '13.5" PixelSense Touch',
    graphics: 'Intel Iris Xe',
    os: 'Windows 11',
    weight: '2.86 lbs',
    originalPrice: 1499.00,
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1659300979054-183c5ff14e61?w=400',
    category: 'electronics',
    description: 'Sleek and elegant laptop with a premium design and vibrant display',
    rating: 4.5,
    reviews: 136,
    inStock: true
  }
];

const Laptops: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(laptops.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'processor',
      label: 'Processor',
      options: ['all', ...new Set(laptops.map(p => p.processor.split(' ')[0]))],
      getValue: (product) => product.processor.split(' ')[0]
    },
    {
      name: 'ram',
      label: 'RAM',
      options: ['all', ...new Set(laptops.flatMap(p => p.ram))],
      getValue: (product) => product.ram
    },
    {
      name: 'storage',
      label: 'Storage',
      options: ['all', ...new Set(laptops.flatMap(p => p.storage))],
      getValue: (product) => product.storage
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $1400', '$1400-$1700', 'Over $1700'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $1400': return price < 1400;
            case '$1400-$1700': return price >= 1400 && price <= 1700;
            case 'Over $1700': return price > 1700;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Laptops"
      description="Discover high-performance laptops for work and play"
      products={laptops}
      filters={filters}
      className="laptops-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Laptops; 