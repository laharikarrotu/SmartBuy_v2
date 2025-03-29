import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss';

interface Product extends BaseProduct {
  style: string;
  occasion: string[];
  colors: string[];
  sizes: string[];
  length: string;
  material: string[];
  brand: string;
}

const dresses: Product[] = [
  {
    id: 'maxi-floral',
    name: 'Floral Maxi Dress',
    style: 'Maxi',
    occasion: ['Casual', 'Beach', 'Vacation'],
    colors: ['Blue Floral', 'Pink Floral', 'Yellow Floral'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    length: 'Long',
    material: ['Rayon', 'Cotton'],
    originalPrice: 79.95,
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
    category: 'clothing',
    description: 'Flowy floral print maxi dress, perfect for summer days',
    inStock: true,
    brand: 'SmartBuy Summer',
    rating: 4.6,
    reviews: 108
  },
  {
    id: 'cocktail-dress',
    name: 'Classic Cocktail Dress',
    style: 'Cocktail',
    occasion: ['Party', 'Evening', 'Formal'],
    colors: ['Black', 'Navy', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L'],
    length: 'Knee-Length',
    material: ['Polyester', 'Spandex'],
    originalPrice: 89.95,
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400',
    category: 'clothing',
    description: 'Elegant cocktail dress with a timeless silhouette',
    inStock: true,
    brand: 'SmartBuy Elegant',
    rating: 4.7,
    reviews: 92
  },
  {
    id: 'summer-mini',
    name: 'Summer Mini Dress',
    style: 'Mini',
    occasion: ['Casual', 'Day Out', 'Beach'],
    colors: ['White', 'Light Blue', 'Coral'],
    sizes: ['XS', 'S', 'M', 'L'],
    length: 'Short',
    material: ['Cotton', 'Linen'],
    originalPrice: 49.95,
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?w=400',
    category: 'clothing',
    description: 'Light and breezy mini dress for hot summer days',
    inStock: true,
    brand: 'SmartBuy Summer',
    rating: 4.4,
    reviews: 76
  },
  {
    id: 'wrap-dress',
    name: 'Classic Wrap Dress',
    style: 'Wrap',
    occasion: ['Work', 'Casual', 'Day Out'],
    colors: ['Black', 'Navy', 'Red', 'Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    length: 'Knee-Length',
    material: ['Jersey'],
    originalPrice: 69.95,
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400',
    category: 'clothing',
    description: 'Flattering wrap dress that works for any occasion',
    inStock: true,
    brand: 'SmartBuy Essentials',
    rating: 4.8,
    reviews: 143
  },
  {
    id: 'slip-dress',
    name: 'Satin Slip Dress',
    style: 'Slip',
    occasion: ['Evening', 'Date Night', 'Party'],
    colors: ['Champagne', 'Black', 'Dusty Rose'],
    sizes: ['XS', 'S', 'M', 'L'],
    length: 'Midi',
    material: ['Satin'],
    originalPrice: 89.95,
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400',
    category: 'clothing',
    description: 'Elegant satin slip dress with adjustable straps',
    inStock: true,
    brand: 'SmartBuy Elegant',
    rating: 4.5,
    reviews: 87
  },
  {
    id: 'sweater-dress',
    name: 'Cozy Sweater Dress',
    style: 'Sweater',
    occasion: ['Casual', 'Work', 'Day Out'],
    colors: ['Gray', 'Beige', 'Black', 'Burgundy'],
    sizes: ['S', 'M', 'L', 'XL'],
    length: 'Midi',
    material: ['Wool', 'Acrylic'],
    originalPrice: 69.95,
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1509631179407-329bca7556b0?w=400',
    category: 'clothing',
    description: 'Comfortable and stylish sweater dress for cooler weather',
    inStock: true,
    brand: 'SmartBuy Winter',
    rating: 4.6,
    reviews: 112
  }
];

const Dresses: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'style',
      label: 'Style',
      options: ['all', ...new Set(dresses.map(p => p.style))],
      getValue: (product) => product.style
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(dresses.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'occasion',
      label: 'Occasion',
      options: ['all', ...new Set(dresses.flatMap(p => p.occasion))],
      getValue: (product) => product.occasion
    },
    {
      name: 'color',
      label: 'Color',
      options: ['all', ...new Set(dresses.flatMap(p => p.colors))],
      getValue: (product) => product.colors
    },
    {
      name: 'length',
      label: 'Length',
      options: ['all', ...new Set(dresses.map(p => p.length))],
      getValue: (product) => product.length
    },
    {
      name: 'size',
      label: 'Size',
      options: ['all', ...new Set(dresses.flatMap(p => p.sizes))],
      getValue: (product) => product.sizes
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $50', '$50 - $70', 'Over $70'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $50': return price < 50;
            case '$50 - $70': return price >= 50 && price <= 70;
            case 'Over $70': return price > 70;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Dresses Collection"
      description="Find the perfect dress for any occasion"
      products={dresses}
      filters={filters}
      className="dresses-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Dresses; 