import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import '../../styles/category.scss'; // Use shared category styles

// Enhanced product interface for men's clothing
interface Product extends BaseProduct {
  type: string;
  colors: string[];
  sizes?: string[];
  materials?: string[];
  fit?: string;
  tag?: string;
}

const shirts: Product[] = [
  {
    id: 'oxford-classic',
    name: 'Oxford Shirt in Classic Fit',
    type: 'Classic Fit Oxford Shirt',
    colors: ['Watermelon', 'Twig Green', 'Light Blue', 'Orange Nectar', 'Wisteria Blossom'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    materials: ['100% Cotton'],
    fit: 'Classic Fit',
    originalPrice: 59.95,
    price: 29.00,
    image: 'https://www.gap.com/webcontent/0057/367/133/cn57367133.jpg?q=h&w=406',
    category: 'clothing',
    description: 'Classic fit Oxford shirt with comfortable cotton fabric',
    inStock: true,
    brand: 'SmartBuy Menswear',
    rating: 4.5,
    reviews: 127
  },
  {
    id: 'oxford-big',
    name: 'Oxford Big Shirt',
    type: 'Big Shirt',
    colors: ['Multi', 'Lavender', 'Optic White Stripe', 'Fresh Coral', 'Moonless Night'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    materials: ['100% Cotton'],
    fit: 'Relaxed Fit',
    originalPrice: 59.95,
    price: 29.00,
    tag: 'Selling fast',
    image: 'https://www.gap.com/webcontent/0057/436/352/cn57436352.jpg?q=h&w=406',
    category: 'clothing',
    description: 'Relaxed fit Oxford shirt with modern styling',
    inStock: true,
    brand: 'SmartBuy Menswear',
    rating: 4.3,
    reviews: 98
  },
  {
    id: 'painted-denim',
    name: 'Painted Denim Big Shirt',
    type: 'Big Shirt',
    colors: ['Medium Wash'],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['100% Cotton Denim'],
    fit: 'Relaxed Fit',
    originalPrice: 69.95,
    price: 34.00,
    image: 'https://www.gap.com/webcontent/0057/584/292/cn57584292.jpg?q=h&w=406',
    category: 'clothing',
    description: 'Denim shirt with painted finish and relaxed fit',
    inStock: true,
    brand: 'SmartBuy Menswear',
    rating: 4.2,
    reviews: 76
  },
  {
    id: 'organic-cotton',
    name: 'Organic Cotton Poplin Classic Shirt',
    type: 'Poplin Shirt',
    colors: ['Light Blue', 'White', 'Navy Gingham', 'Blue Stripe', 'Tea Rose'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    materials: ['100% Organic Cotton'],
    fit: 'Classic Fit',
    originalPrice: 59.95,
    price: 29.00,
    tag: 'Eco-Friendly',
    image: 'https://www.gap.com/webcontent/0057/729/463/cn57729463.jpg?q=h&w=406',
    category: 'clothing',
    description: 'Classic fit shirt made from organic cotton poplin',
    inStock: true,
    brand: 'SmartBuy Menswear',
    rating: 4.7,
    reviews: 142
  }
];

const jeans: Product[] = [
  {
    id: 'slim-jeans',
    name: 'Slim Jeans',
    type: 'Slim Fit',
    colors: ['Medium Wash', 'Worn Dark', 'Light Wash', 'Resin Rinse'],
    sizes: ['30x30', '30x32', '32x30', '32x32', '34x30', '34x32', '36x32'],
    materials: ['98% Cotton, 2% Elastane'],
    fit: 'Slim Fit',
    originalPrice: 69.95,
    price: 55.00,
    image: 'https://www.gap.com/webcontent/0054/321/583/cn54321583.jpg?q=h&w=406',
    category: 'clothing',
    description: 'Slim fit jeans with comfortable stretch fabric',
    inStock: true,
    brand: 'SmartBuy Denim',
    rating: 4.4,
    reviews: 218
  },
  {
    id: 'slim-jeans-discounted',
    name: 'Slim Jeans (Discounted)',
    type: 'Slim Fit',
    colors: ['Medium Wash', 'Worn Dark', 'Light Wash', 'Resin Rinse'],
    sizes: ['30x30', '30x32', '32x30', '32x32', '34x30', '34x32', '36x32'],
    materials: ['98% Cotton, 2% Elastane'],
    fit: 'Slim Fit',
    originalPrice: 69.95,
    price: 34.00,
    tag: '50% off: price as marked',
    image: 'https://www.gap.com/webcontent/0054/321/496/cn54321496.jpg?q=h&w=406',
    category: 'clothing',
    description: 'Slim fit jeans with comfortable stretch fabric - on sale',
    inStock: true,
    brand: 'SmartBuy Denim',
    rating: 4.4,
    reviews: 165
  },
  {
    id: 'slim-selvedge',
    name: 'Slim Selvedge Jeans',
    type: 'Selvedge Slim',
    colors: ['Medium Wash', 'Dark Wash'],
    sizes: ['30x30', '30x32', '32x30', '32x32', '34x30', '34x32'],
    materials: ['100% Cotton Selvedge Denim'],
    fit: 'Slim Fit',
    originalPrice: 99.00,
    price: 49.00,
    tag: '50% off: price as marked',
    image: 'https://www.gap.com/webcontent/0057/584/140/cn57584140.jpg?q=h&w=406',
    category: 'clothing',
    description: 'Premium selvedge denim jeans with slim fit',
    inStock: true,
    brand: 'SmartBuy Premium',
    rating: 4.8,
    reviews: 87
  },
  {
    id: 'city-jeans',
    name: 'City Jeans in Slim Fit',
    type: 'Slim Fit City Jeans',
    colors: ['Black', 'Navy', 'Brown', 'Olive Green', 'Eiffel Tower'],
    sizes: ['30x30', '30x32', '32x30', '32x32', '34x30', '34x32', '36x32'],
    materials: ['92% Cotton, 6% Polyester, 2% Elastane'],
    fit: 'Slim Fit',
    originalPrice: 69.95,
    price: 34.00,
    tag: '50% off: price as marked',
    image: 'https://www.gap.com/webcontent/0055/716/738/cn55716738.jpg?q=h&w=406',
    category: 'clothing',
    description: 'Modern slim fit jeans perfect for city wear',
    inStock: true,
    brand: 'SmartBuy Denim',
    rating: 4.5,
    reviews: 132
  }
];

const Mens: React.FC = () => {
  // Get all products
  const allProducts = [...shirts, ...jeans];
  
  // Define filters
  const filters: Filter[] = [
    {
      name: 'productType',
      label: 'Product Type',
      options: ['all', 'shirts', 'jeans'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'shirts') return products.filter(p => shirts.some(s => s.id === p.id));
        if (selectedValue === 'jeans') return products.filter(p => jeans.some(j => j.id === p.id));
        return products;
      }
    },
    {
      name: 'type',
      label: 'Type',
      options: ['all', ...new Set(allProducts.map(p => p.type))],
      getValue: (product) => product.type
    },
    {
      name: 'fit',
      label: 'Fit',
      options: ['all', ...new Set(allProducts.map(p => p.fit || '').filter(Boolean))],
      getValue: (product) => product.fit || ''
    },
    {
      name: 'color',
      label: 'Color',
      options: ['all', ...new Set(allProducts.flatMap(p => p.colors))],
      getValue: (product) => product.colors
    },
    {
      name: 'size',
      label: 'Size',
      options: ['all', ...new Set(allProducts.flatMap(p => p.sizes || []))],
      getValue: (product) => product.sizes || []
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $35', '$35 - $50', 'Over $50'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $35': return price < 35;
            case '$35 - $50': return price >= 35 && price <= 50;
            case 'Over $50': return price > 50;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Men's Collection"
      description="Discover our latest collection of men's clothing"
      products={allProducts}
      filters={filters}
      className="mens-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Mens; 