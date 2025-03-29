import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss';

interface Product extends BaseProduct {
  fit: string;
  gender: 'Men' | 'Women' | 'Unisex';
  colors: string[];
  waistSizes: string[];
  inseam?: string[];
  rise?: string;
  materials?: string[];
  brand: string;
}

const jeans: Product[] = [
  {
    id: 'slim-jeans',
    name: 'Slim Jeans',
    fit: 'Slim Fit',
    gender: 'Men',
    colors: ['Medium Wash', 'Dark Wash', 'Light Wash', 'Black'],
    waistSizes: ['28', '30', '32', '34', '36', '38'],
    inseam: ['30', '32', '34'],
    rise: 'Mid-Rise',
    materials: ['98% Cotton, 2% Elastane'],
    originalPrice: 69.95,
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    category: 'clothing',
    description: 'Slim fit jeans with stretch for comfort and mobility',
    inStock: true,
    brand: 'SmartBuy Denim',
    rating: 4.4,
    reviews: 158
  },
  {
    id: 'straight-jeans',
    name: 'Straight Leg Jeans',
    fit: 'Straight Fit',
    gender: 'Men',
    colors: ['Medium Wash', 'Dark Wash', 'Black'],
    waistSizes: ['30', '32', '34', '36', '38', '40'],
    inseam: ['30', '32', '34', '36'],
    rise: 'Mid-Rise',
    materials: ['100% Cotton'],
    originalPrice: 69.95,
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1604176424472-9e9468205158?w=400',
    category: 'clothing',
    description: 'Classic straight leg jeans with a timeless look',
    inStock: true,
    brand: 'SmartBuy Denim',
    rating: 4.2,
    reviews: 124
  },
  {
    id: 'relaxed-jeans',
    name: 'Relaxed Fit Jeans',
    fit: 'Relaxed Fit',
    gender: 'Men',
    colors: ['Medium Wash', 'Light Wash'],
    waistSizes: ['32', '34', '36', '38', '40', '42'],
    inseam: ['30', '32', '34'],
    rise: 'Mid-Rise',
    materials: ['100% Cotton'],
    originalPrice: 64.95,
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400',
    category: 'clothing',
    description: 'Relaxed fit jeans with extra room through hip and thigh',
    inStock: true,
    brand: 'SmartBuy Denim',
    rating: 4.3,
    reviews: 93
  },
  {
    id: 'skinny-jeans-women',
    name: 'Skinny Jeans',
    fit: 'Skinny Fit',
    gender: 'Women',
    colors: ['Dark Wash', 'Medium Wash', 'Black', 'White'],
    waistSizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
    rise: 'High-Rise',
    materials: ['92% Cotton, 6% Polyester, 2% Elastane'],
    originalPrice: 69.95,
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=400',
    category: 'clothing',
    description: 'High-rise skinny jeans with super stretch denim',
    inStock: true,
    brand: 'SmartBuy Women',
    rating: 4.6,
    reviews: 212
  },
  {
    id: 'bootcut-jeans',
    name: 'Boot Cut Jeans',
    fit: 'Boot Cut',
    gender: 'Women',
    colors: ['Medium Wash', 'Dark Wash'],
    waistSizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
    rise: 'Mid-Rise',
    materials: ['98% Cotton, 2% Elastane'],
    originalPrice: 74.95,
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400',
    category: 'clothing',
    description: 'Classic boot cut jeans that flare from knee to ankle',
    inStock: true,
    brand: 'SmartBuy Women',
    rating: 4.3,
    reviews: 87
  },
  {
    id: 'wide-leg-jeans',
    name: 'Wide Leg Jeans',
    fit: 'Wide Leg',
    gender: 'Women',
    colors: ['Light Wash', 'Medium Wash', 'Black'],
    waistSizes: ['24', '25', '26', '27', '28', '29', '30', '31'],
    rise: 'High-Rise',
    materials: ['100% Cotton'],
    originalPrice: 79.95,
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1619533394727-57d522857f89?w=400',
    category: 'clothing',
    description: 'Trendy high-rise wide leg jeans with a relaxed silhouette',
    inStock: true,
    brand: 'SmartBuy Women',
    rating: 4.5,
    reviews: 104
  }
];

const Jeans: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'fit',
      label: 'Fit',
      options: ['all', ...new Set(jeans.map(p => p.fit))],
      getValue: (product) => product.fit
    },
    {
      name: 'gender',
      label: 'Gender',
      options: ['all', 'Men', 'Women'],
      getValue: (product) => product.gender
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(jeans.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'color',
      label: 'Color',
      options: ['all', ...new Set(jeans.flatMap(p => p.colors))],
      getValue: (product) => product.colors
    },
    {
      name: 'rise',
      label: 'Rise',
      options: ['all', ...new Set(jeans.map(p => p.rise || '').filter(Boolean))],
      getValue: (product) => product.rise || ''
    },
    {
      name: 'waistSize',
      label: 'Waist Size',
      options: ['all', ...new Set(jeans.flatMap(p => p.waistSizes))],
      getValue: (product) => product.waistSizes
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $50', '$50 - $60', 'Over $60'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $50': return price < 50;
            case '$50 - $60': return price >= 50 && price <= 60;
            case 'Over $60': return price > 60;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Jeans Collection"
      description="Find your perfect fit with our premium denim collection"
      products={jeans}
      filters={filters}
      className="jeans-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Jeans; 