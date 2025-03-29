import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss';

interface Product extends BaseProduct {
  brand: string;
  sizes?: string[];
  colors?: string[];
  tag?: string;
  fit?: string;
  materials?: string[];
}

const womensProducts: Product[] = [
  {
    id: "w1",
    name: "Women's Essential Cotton T-Shirt",
    brand: "SmartBuy Basics",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5339575?$sclp-prd-main_large$",
    category: 'clothing',
    description: "Classic fit cotton t-shirt with essential comfort.",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray", "Navy"],
    materials: ["100% Cotton"],
    fit: "Classic Fit",
    tag: "Best Seller"
  },
  {
    id: "w2",
    name: "Women's High-Waist Jeans",
    brand: "SmartBuy Denim",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5154856?$sclp-prd-main_large$",
    category: 'clothing',
    description: "Stretchy high-waist jeans with perfect fit.",
    rating: 4.3,
    reviews: 256,
    inStock: true,
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Dark Wash", "Medium Wash", "Black"],
    materials: ["95% Cotton, 5% Elastane"],
    fit: "Skinny Fit",
    tag: "New Arrival"
  },
  {
    id: "w3",
    name: "Women's Floral Summer Dress",
    brand: "SmartBuy Fashion",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5066968?$sclp-prd-main_large$",
    category: 'clothing',
    description: "Lightweight floral dress perfect for summer.",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue Floral", "Pink Floral", "White Floral"],
    materials: ["100% Rayon"],
    fit: "A-Line",
    tag: "Summer Collection"
  },
  {
    id: "w4",
    name: "Women's Athletic Leggings",
    brand: "SmartBuy Sport",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5173207?$sclp-prd-main_large$",
    category: 'clothing',
    description: "High-performance leggings for workouts.",
    rating: 4.6,
    reviews: 167,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray", "Purple"],
    materials: ["85% Polyester, 15% Spandex"],
    fit: "Compression",
    tag: "Trending"
  },
  {
    id: "w5",
    name: "Women's Blazer Jacket",
    brand: "SmartBuy Professional",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5290734?$sclp-prd-main_large$",
    category: 'clothing',
    description: "Classic blazer for professional wear.",
    rating: 4.4,
    reviews: 92,
    inStock: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Gray", "Navy"],
    materials: ["70% Polyester, 25% Rayon, 5% Elastane"],
    fit: "Tailored",
    tag: "Office Wear"
  },
  {
    id: "w6",
    name: "Women's Cashmere Sweater",
    brand: "SmartBuy Luxury",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5522410?$sclp-prd-main_large$",
    category: 'clothing',
    description: "Luxuriously soft cashmere sweater for ultimate comfort.",
    rating: 4.8,
    reviews: 76,
    inStock: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Camel", "Black", "Cream", "Burgundy"],
    materials: ["100% Cashmere"],
    fit: "Regular Fit",
    tag: "Premium Collection"
  }
];

const Womens: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getUniqueCategories = () => {
    const categories = womensProducts.map(product => product.tag || 'Other');
    return ['all', ...new Set(categories)];
  };

  const getPriceRanges = () => {
    return [
      'all',
      'Under $30',
      '$30 - $50',
      '$50 - $80',
      'Over $80'
    ];
  };

  // Define filters
  const filters: Filter[] = [
    {
      name: 'category',
      label: 'Category',
      options: ['all', ...new Set(womensProducts.map(product => product.tag || 'Other'))],
      getValue: (product) => product.tag || 'Other'
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(womensProducts.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'fit',
      label: 'Fit',
      options: ['all', ...new Set(womensProducts.map(p => p.fit || '').filter(Boolean))],
      getValue: (product) => product.fit || ''
    },
    {
      name: 'size',
      label: 'Size',
      options: ['all', ...new Set(womensProducts.flatMap(p => p.sizes || []))],
      getValue: (product) => product.sizes || []
    },
    {
      name: 'color',
      label: 'Color',
      options: ['all', ...new Set(womensProducts.flatMap(p => p.colors || []))],
      getValue: (product) => product.colors || []
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: [
        'all',
        'Under $30',
        '$30 - $50',
        '$50 - $80',
        'Over $80'
      ],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $30': return price < 30;
            case '$30 - $50': return price >= 30 && price <= 50;
            case '$50 - $80': return price > 50 && price <= 80;
            case 'Over $80': return price > 80;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Women's Clothing"
      description="Discover our collection of stylish women's fashion"
      products={womensProducts}
      filters={filters}
      className="womens-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Womens; 