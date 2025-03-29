import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss'; // Use shared category styles

interface Product extends BaseProduct {
  fit: string;
  gender: 'Men' | 'Women' | 'Unisex';
  colors: string[];
  materials: string[];
  sizes: string[];
  brand: string;
}

const shirts: Product[] = [
  {
    id: 'oxford-classic',
    name: 'Oxford Shirt in Classic Fit',
    fit: 'Classic Fit',
    gender: 'Men',
    colors: ['White', 'Blue', 'Light Blue', 'Pink'],
    materials: ['Cotton'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    originalPrice: 59.95,
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1594938291221-94f28d122cbb?w=400',
    category: 'clothing',
    description: 'Classic fit Oxford shirt with comfortable cotton fabric',
    inStock: true,
    brand: 'SmartBuy Menswear',
    rating: 4.5,
    reviews: 124
  },
  {
    id: 'oxford-slim',
    name: 'Oxford Shirt in Slim Fit',
    fit: 'Slim Fit',
    gender: 'Men',
    colors: ['White', 'Blue', 'Light Blue', 'Gray'],
    materials: ['Cotton'],
    sizes: ['S', 'M', 'L', 'XL'],
    originalPrice: 59.95,
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400',
    category: 'clothing',
    description: 'Slim fit Oxford shirt for a modern, tailored look',
    inStock: true,
    brand: 'SmartBuy Menswear',
    rating: 4.4,
    reviews: 98
  },
  {
    id: 'poplin-button',
    name: 'Poplin Button-Down Shirt',
    fit: 'Regular Fit',
    gender: 'Men',
    colors: ['White', 'Blue', 'Pink', 'Black'],
    materials: ['Cotton', 'Poplin'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    originalPrice: 49.95,
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400',
    category: 'clothing',
    description: 'Lightweight poplin shirt with button-down collar',
    inStock: true,
    brand: 'SmartBuy Menswear',
    rating: 4.3,
    reviews: 87
  },
  {
    id: 'casual-linen',
    name: 'Casual Linen Shirt',
    fit: 'Relaxed Fit',
    gender: 'Men',
    colors: ['White', 'Natural', 'Light Blue', 'Olive'],
    materials: ['Linen'],
    sizes: ['S', 'M', 'L', 'XL'],
    originalPrice: 69.95,
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=400',
    category: 'clothing',
    description: 'Breathable linen shirt, perfect for warm weather',
    inStock: true,
    brand: 'SmartBuy Summer',
    rating: 4.6,
    reviews: 103
  },
  {
    id: 'flannel-shirt',
    name: 'Plaid Flannel Shirt',
    fit: 'Regular Fit',
    gender: 'Unisex',
    colors: ['Red Plaid', 'Blue Plaid', 'Green Plaid'],
    materials: ['Cotton', 'Flannel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    originalPrice: 54.95,
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1642261375772-9ee9e543f389?w=400',
    category: 'clothing',
    description: 'Soft, warm flannel shirt in classic plaid patterns',
    inStock: true,
    brand: 'SmartBuy Outdoors',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'womens-blouse',
    name: 'Silk Blouse',
    fit: 'Relaxed Fit',
    gender: 'Women',
    colors: ['White', 'Ivory', 'Black', 'Blush'],
    materials: ['Silk'],
    sizes: ['XS', 'S', 'M', 'L'],
    originalPrice: 79.95,
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=400',
    category: 'clothing',
    description: 'Elegant silk blouse with a relaxed silhouette',
    inStock: true,
    brand: 'SmartBuy Women',
    rating: 4.8,
    reviews: 92
  }
];

const Shirts: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'fit',
      label: 'Fit',
      options: ['all', ...new Set(shirts.map(p => p.fit))],
      getValue: (product) => product.fit
    },
    {
      name: 'gender',
      label: 'Gender',
      options: ['all', 'Men', 'Women', 'Unisex'],
      getValue: (product) => product.gender
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(shirts.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'color',
      label: 'Color',
      options: ['all', ...new Set(shirts.flatMap(p => p.colors))],
      getValue: (product) => product.colors
    },
    {
      name: 'material',
      label: 'Material',
      options: ['all', ...new Set(shirts.flatMap(p => p.materials))],
      getValue: (product) => product.materials
    },
    {
      name: 'size',
      label: 'Size',
      options: ['all', ...new Set(shirts.flatMap(p => p.sizes))],
      getValue: (product) => product.sizes
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $30', '$30 - $40', 'Over $40'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $30': return price < 30;
            case '$30 - $40': return price >= 30 && price <= 40;
            case 'Over $40': return price > 40;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Shirts Collection"
      description="Discover our quality shirts for every occasion"
      products={shirts}
      filters={filters}
      className="shirts-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Shirts; 