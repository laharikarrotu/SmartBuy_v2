import React from 'react';
import CategoryTemplate, { BaseProduct, Filter } from '../../components/CategoryTemplate/CategoryTemplate';
import './pets.scss';

interface Product extends BaseProduct {
  brand: string;
  type: string;
  petType: string[];
  features: string[];
}

const petSupplies: Product[] = [
  {
    id: "ps1",
    name: "Premium Pet Food Bowl Set",
    brand: "PetDine",
    type: "Feeding",
    petType: ["Dog", "Cat"],
    features: ["Stainless steel", "Non-slip base", "Dishwasher safe"],
    originalPrice: 34.99,
    price: 24.99,
    image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400",
    category: 'dog',
    description: "Set of two durable stainless steel bowls with non-slip base",
    rating: 4.7,
    reviews: 187,
    inStock: true
  },
  {
    id: "ps2",
    name: "Automatic Pet Feeder",
    brand: "SmartFeed",
    type: "Feeding",
    petType: ["Dog", "Cat"],
    features: ["Programmable timer", "Portion control", "Battery backup"],
    originalPrice: 89.99,
    price: 69.99,
    image: "https://images.unsplash.com/photo-1593716926551-9761c6f3f7b7?w=400",
    category: 'dog',
    description: "Programmable automatic feeder for scheduled meals",
    rating: 4.5,
    reviews: 142,
    inStock: true
  },
  {
    id: "ps3",
    name: "Pet Grooming Kit",
    brand: "FurCare",
    type: "Grooming",
    petType: ["Dog", "Cat"],
    features: ["Multiple attachments", "Quiet operation", "Cordless design"],
    originalPrice: 79.99,
    price: 59.99,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400",
    category: 'dog',
    description: "Complete grooming kit with various attachments for all coat types",
    rating: 4.6,
    reviews: 211,
    inStock: true
  },
  {
    id: "ps4",
    name: "Pet Shampoo & Conditioner Set",
    brand: "NaturePet",
    type: "Grooming",
    petType: ["Dog", "Cat"],
    features: ["All-natural", "Tearless formula", "Soothing lavender"],
    originalPrice: 29.99,
    price: 24.99,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400",
    category: 'dog',
    description: "Gentle, all-natural shampoo and conditioner formulated for sensitive skin",
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: "ps5",
    name: "Pet First Aid Kit",
    brand: "PetMedic",
    type: "Health",
    petType: ["Dog", "Cat", "Small Pets"],
    features: ["Comprehensive", "Compact case", "Emergency guide"],
    originalPrice: 49.99,
    price: 39.99,
    image: "https://images.unsplash.com/photo-1583939411023-c1a5592e3069?w=400",
    category: 'dog',
    description: "Essential first aid supplies for pet emergencies",
    rating: 4.9,
    reviews: 89,
    inStock: true
  },
  {
    id: "ps6",
    name: "Retractable Pet Leash",
    brand: "WalkPro",
    type: "Walking",
    petType: ["Dog"],
    features: ["16ft range", "One-button brake", "Comfortable grip"],
    originalPrice: 39.99,
    price: 29.99,
    image: "https://images.unsplash.com/photo-1567715761434-51a0ea316300?w=400",
    category: 'dog',
    description: "Durable retractable leash with quick-lock brake system",
    rating: 4.6,
    reviews: 178,
    inStock: true
  },
  {
    id: "ps7",
    name: "Pet Hair Remover Roller",
    brand: "CleanPet",
    type: "Cleaning",
    petType: ["Dog", "Cat"],
    features: ["Reusable", "Self-cleaning", "No adhesive"],
    originalPrice: 29.99,
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544134263-47f5a30726a5?w=400",
    category: 'dog',
    description: "Efficient pet hair remover for furniture, clothing, and car interiors",
    rating: 4.7,
    reviews: 234,
    inStock: true
  },
  {
    id: "ps8",
    name: "Cat Litter Box System",
    brand: "CleanKitty",
    type: "Litter",
    petType: ["Cat"],
    features: ["Self-cleaning", "Odor control", "Low tracking"],
    originalPrice: 149.99,
    price: 119.99,
    image: "https://images.unsplash.com/photo-1595952617194-3d9420ef4c3d?w=400",
    category: 'cat',
    description: "Advanced self-cleaning litter box system with odor control technology",
    rating: 4.4,
    reviews: 167,
    inStock: true
  },
  {
    id: "ps9",
    name: "Pet Travel Carrier",
    brand: "SafeTravel",
    type: "Travel",
    petType: ["Dog", "Cat"],
    features: ["Airline approved", "Ventilated", "Multiple openings"],
    originalPrice: 89.99,
    price: 69.99,
    image: "https://images.unsplash.com/photo-1659196981229-5abf0bc26ed8?w=400",
    category: 'cat',
    description: "Comfortable airline-approved pet carrier with multiple access points",
    rating: 4.6,
    reviews: 119,
    inStock: true
  }
];

const PetSupplies: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'type',
      label: 'Product Type',
      options: ['all', ...new Set(petSupplies.map(p => p.type))],
      getValue: (product) => product.type
    },
    {
      name: 'petType',
      label: 'Pet Type',
      options: ['all', ...new Set(petSupplies.flatMap(p => p.petType))],
      getValue: (product) => product.petType
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(petSupplies.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'feature',
      label: 'Feature',
      options: ['all', ...new Set(petSupplies.flatMap(p => p.features))],
      getValue: (product) => product.features
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $30', '$30-$60', '$60-$100', 'Over $100'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $30': return price < 30;
            case '$30-$60': return price >= 30 && price <= 60;
            case '$60-$100': return price >= 60 && price <= 100;
            case 'Over $100': return price > 100;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Pet Supplies"
      description="Essential supplies for all your pet's needs"
      products={petSupplies}
      filters={filters}
      className="pet-supplies-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default PetSupplies; 