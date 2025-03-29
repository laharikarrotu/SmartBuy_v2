import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss';

interface Product extends BaseProduct {
  style: string;
  gender?: 'Men' | 'Women' | 'Unisex';
  colors: string[];
  materials?: string[];
  sizes?: string[];
  brand: string;
}

const hats: Product[] = [
  {
    id: 'baseball-cap',
    name: 'Classic Baseball Cap',
    style: 'Baseball',
    gender: 'Unisex',
    colors: ['Black', 'Navy', 'Red', 'White'],
    materials: ['Cotton'],
    sizes: ['One Size'],
    originalPrice: 24.95,
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400',
    category: 'clothing',
    description: 'Classic 6-panel cotton baseball cap with adjustable strap',
    inStock: true,
    brand: 'SmartBuy Basics',
    rating: 4.2,
    reviews: 86
  },
  {
    id: 'bucket-hat',
    name: 'Cotton Bucket Hat',
    style: 'Bucket',
    gender: 'Unisex',
    colors: ['Black', 'Khaki', 'Navy', 'White'],
    materials: ['Cotton'],
    sizes: ['S/M', 'L/XL'],
    originalPrice: 29.95,
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1623411735103-fee0e09e867c?w=400',
    category: 'clothing',
    description: 'Trendy bucket hat, perfect for summer days',
    inStock: true,
    brand: 'SmartBuy Summer',
    rating: 4.4,
    reviews: 58
  },
  {
    id: 'beanie',
    name: 'Knit Beanie',
    style: 'Beanie',
    gender: 'Unisex',
    colors: ['Black', 'Gray', 'Navy', 'Burgundy'],
    materials: ['Wool', 'Acrylic'],
    sizes: ['One Size'],
    originalPrice: 19.95,
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400',
    category: 'clothing',
    description: 'Warm knit beanie for cold weather',
    inStock: true,
    brand: 'SmartBuy Winter',
    rating: 4.5,
    reviews: 124
  },
  {
    id: 'fedora',
    name: 'Classic Fedora',
    style: 'Fedora',
    gender: 'Unisex',
    colors: ['Black', 'Brown', 'Gray'],
    materials: ['Felt', 'Wool'],
    sizes: ['S', 'M', 'L', 'XL'],
    originalPrice: 49.95,
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400',
    category: 'clothing',
    description: 'Elegant wool felt fedora with ribbon band',
    inStock: true,
    brand: 'SmartBuy Premium',
    rating: 4.7,
    reviews: 42
  },
  {
    id: 'straw-hat',
    name: 'Summer Straw Hat',
    style: 'Wide Brim',
    gender: 'Unisex',
    colors: ['Natural', 'Beige'],
    materials: ['Straw'],
    sizes: ['One Size'],
    originalPrice: 34.95,
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1682534265483-a0b5be2d2a3c?w=400',
    category: 'clothing',
    description: 'Breathable straw hat, perfect for beach days',
    inStock: true,
    brand: 'SmartBuy Summer',
    rating: 4.3,
    reviews: 67
  },
  {
    id: 'sun-hat',
    name: 'Wide Brim Sun Hat',
    style: 'Wide Brim',
    gender: 'Women',
    colors: ['Natural', 'Black', 'White'],
    materials: ['Paper Straw', 'Cotton'],
    sizes: ['One Size'],
    originalPrice: 39.95,
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1529727074503-fb1b2831bdfe?w=400',
    category: 'clothing',
    description: 'Elegant wide brim sun hat with UPF protection',
    inStock: true,
    brand: 'SmartBuy Summer',
    rating: 4.6,
    reviews: 78
  }
];

const Hats: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'style',
      label: 'Style',
      options: ['all', ...new Set(hats.map(p => p.style))],
      getValue: (product) => product.style
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(hats.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'gender',
      label: 'Gender',
      options: ['all', 'Men', 'Women', 'Unisex'],
      getValue: (product) => product.gender || 'Unisex'
    },
    {
      name: 'color',
      label: 'Color',
      options: ['all', ...new Set(hats.flatMap(p => p.colors))],
      getValue: (product) => product.colors
    },
    {
      name: 'material',
      label: 'Material',
      options: ['all', ...new Set(hats.flatMap(p => p.materials || []))],
      getValue: (product) => product.materials || []
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $20', '$20-$30', 'Over $30'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $20': return price < 20;
            case '$20-$30': return price >= 20 && price <= 30;
            case 'Over $30': return price > 30;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Hats Collection"
      description="Find the perfect hat to complete your style"
      products={hats}
      filters={filters}
      className="hats-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Hats; 