import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import './pets.scss';

interface Product extends BaseProduct {
  brand: string;
  type: string;
  petSize?: string[];
  age?: string[];
  features: string[];
}

const dogProducts: Product[] = [
  {
    id: "d1",
    name: "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food",
    brand: "Purina",
    type: "Food",
    petSize: ["Small", "Medium", "Large"],
    age: ["Adult"],
    features: ["For Sensitive Digestion", "Grain-Free", "High Protein"],
    originalPrice: 99.99,
    price: 89.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5339575?$sclp-prd-main_large$",
    category: 'dog',
    description: "Premium dog food formulated for sensitive skin and stomach.",
    rating: 4.7,
    reviews: 2693,
    inStock: true
  },
  {
    id: "d2",
    name: "Hill's Science Diet Sensitive Stomach & Skin Adult Dry Dog Food",
    brand: "Hill's Science Diet",
    type: "Food",
    petSize: ["Small", "Medium", "Large"],
    age: ["Adult"],
    features: ["For Sensitive Digestion", "Scientifically Formulated", "Balanced Nutrition"],
    originalPrice: 94.99,
    price: 83.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5154856?$sclp-prd-main_large$",
    category: 'dog',
    description: "Scientifically formulated dog food for sensitive stomach and skin.",
    rating: 4.5,
    reviews: 768,
    inStock: true
  },
  {
    id: "d3",
    name: "Blue Buffalo Life Protection Formula Adult Dry Dog Food - Chicken",
    brand: "Blue Buffalo",
    type: "Food",
    petSize: ["Small", "Medium", "Large", "Giant"],
    age: ["Adult"],
    features: ["Natural Ingredients", "Real Chicken", "No By-Products"],
    originalPrice: 74.99,
    price: 64.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5066968?$sclp-prd-main_large$",
    category: 'dog',
    description: "Natural dog food with real chicken as the first ingredient.",
    rating: 4.6,
    reviews: 937,
    inStock: true
  },
  {
    id: "d4",
    name: "Royal Canin Size Health Nutrition Small Breed Adult Dry Dog Food",
    brand: "Royal Canin",
    type: "Food",
    petSize: ["Small"],
    age: ["Adult"],
    features: ["Small Breed Formula", "Dental Health", "Complete Nutrition"],
    originalPrice: 69.99,
    price: 59.99,
    image: "https://s7d2.scene7.com/is/image/smartbuy/5173207?$sclp-prd-main_large$",
    category: 'dog',
    description: "Specialized nutrition for small breed adult dogs.",
    rating: 4.5,
    reviews: 760,
    inStock: true
  },
  {
    id: "t1",
    name: "KONG Wobbler Treat Dispensing Dog Toy",
    brand: "KONG",
    type: "Toy",
    petSize: ["Medium", "Large"],
    features: ["Interactive", "Treat Dispensing", "Durable"],
    originalPrice: 19.99,
    price: 14.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5290734?$sclp-prd-main_large$",
    category: 'dog',
    description: "Interactive treat dispensing toy for dogs",
    rating: 4.8,
    reviews: 876,
    inStock: true
  },
  {
    id: "t2",
    name: "Nylabone Dura Chew Textured Dog Chew",
    brand: "Nylabone",
    type: "Toy",
    petSize: ["Small", "Medium", "Large"],
    features: ["Durable", "Dental Health", "Long-Lasting"],
    originalPrice: 13.99,
    price: 9.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5298743?$sclp-prd-main_large$",
    category: 'dog',
    description: "Durable chew toy for dogs",
    rating: 4.4,
    reviews: 632,
    inStock: true
  },
  {
    id: "t3",
    name: "Outward Hound Hide-A-Squirrel Plush Dog Toy",
    brand: "Outward Hound",
    type: "Toy",
    petSize: ["Small", "Medium"],
    features: ["Interactive", "Plush", "Mental Stimulation"],
    originalPrice: 24.99,
    price: 17.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5297349?$sclp-prd-main_large$",
    category: 'dog',
    description: "Interactive plush toy for dogs",
    rating: 4.7,
    reviews: 945,
    inStock: true
  },
  {
    id: "b1",
    name: "Orthopedic Dog Bed with Memory Foam",
    brand: "PetFusion",
    type: "Bed",
    petSize: ["Medium", "Large", "X-Large"],
    features: ["Memory Foam", "Waterproof Liner", "Non-Slip Bottom"],
    originalPrice: 119.99,
    price: 99.99,
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=400",
    category: 'dog',
    description: "Premium orthopedic dog bed with memory foam for optimal comfort and support",
    rating: 4.8,
    reviews: 1243,
    inStock: true
  }
];

const Dog: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'type',
      label: 'Product Type',
      options: ['all', ...new Set(dogProducts.map(p => p.type))],
      getValue: (product) => product.type
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(dogProducts.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'petSize',
      label: 'Dog Size',
      options: ['all', ...new Set(dogProducts.flatMap(p => p.petSize || []))],
      getValue: (product) => product.petSize || []
    },
    {
      name: 'age',
      label: 'Age',
      options: ['all', ...new Set(dogProducts.flatMap(p => p.age || []))],
      getValue: (product) => product.age || []
    },
    {
      name: 'feature',
      label: 'Feature',
      options: ['all', ...new Set(dogProducts.flatMap(p => p.features))],
      getValue: (product) => product.features
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $20', '$20-$50', '$50-$100', 'Over $100'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $20': return price < 20;
            case '$20-$50': return price >= 20 && price <= 50;
            case '$50-$100': return price >= 50 && price <= 100;
            case 'Over $100': return price > 100;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Dog Products & Supplies"
      description="Everything your dog needs for a healthy, happy life"
      products={dogProducts}
      filters={filters}
      className="dog-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Dog; 