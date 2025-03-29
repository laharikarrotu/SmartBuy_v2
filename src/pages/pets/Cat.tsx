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

const catProducts: Product[] = [
  {
    id: "cat1",
    name: "Premium Cat Food",
    brand: "Whisker Nutrition",
    type: "Food",
    age: ["Adult"],
    features: ["High protein formula", "Grain-free", "Added vitamins"],
    originalPrice: 44.99,
    price: 34.99,
    image: "https://images.unsplash.com/photo-1604542031658-5799ca5d7936?w=400",
    category: 'cat',
    description: "Balanced nutrition for adult cats with premium ingredients.",
    rating: 4.7,
    reviews: 183,
    inStock: true
  },
  {
    id: "cat2",
    name: "Plush Cat Bed",
    brand: "ComfyCat",
    type: "Bed",
    petSize: ["Small", "Medium"],
    features: ["Soft plush material", "Machine washable", "Non-slip bottom"],
    originalPrice: 59.99,
    price: 42.99,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400",
    category: 'cat',
    description: "Cozy bed for optimal cat comfort and better sleep.",
    rating: 4.9,
    reviews: 208,
    inStock: true
  },
  {
    id: "cat3",
    name: "Interactive Cat Toy",
    brand: "PlayfulPaws",
    type: "Toy",
    features: ["Battery operated", "Multiple play modes", "Automatic shut-off"],
    originalPrice: 24.99,
    price: 18.99,
    image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400",
    category: 'cat',
    description: "Engaging toy that stimulates your cat's hunting instincts.",
    rating: 4.6,
    reviews: 127,
    inStock: true
  },
  {
    id: "cat4",
    name: "Cat Scratching Post",
    brand: "ScratchMaster",
    type: "Furniture",
    features: ["Sisal material", "Sturdy base", "Plush top perch"],
    originalPrice: 79.99,
    price: 64.99,
    image: "https://images.unsplash.com/photo-1592401807555-09fdb3c8711f?w=400",
    category: 'cat',
    description: "Durable scratching post to protect your furniture and satisfy your cat's scratching needs.",
    rating: 4.8,
    reviews: 152,
    inStock: true
  },
  {
    id: "cat5",
    name: "Covered Cat Litter Box",
    brand: "CleanKitty",
    type: "Supplies",
    features: ["Odor control", "Easy to clean", "Privacy hood"],
    originalPrice: 49.99,
    price: 39.99,
    image: "https://images.unsplash.com/photo-1606492758341-cdc9bd1fbf69?w=400",
    category: 'cat',
    description: "Spacious covered litter box with odor control and easy cleaning.",
    rating: 4.5,
    reviews: 174,
    inStock: true
  },
  {
    id: "cat6",
    name: "Premium Clumping Cat Litter",
    brand: "CleanKitty",
    type: "Supplies",
    features: ["Clumping formula", "Dust-free", "Odor neutralizing"],
    originalPrice: 29.99,
    price: 24.99,
    image: "https://images.unsplash.com/photo-1635580724970-89588b4e5fa5?w=400",
    category: 'cat',
    description: "High-quality clumping cat litter with superior odor control.",
    rating: 4.7,
    reviews: 196,
    inStock: true
  },
  {
    id: "cat7",
    name: "Cat Carrier",
    brand: "SafeTravel",
    type: "Travel",
    petSize: ["Small", "Medium"],
    features: ["Airline approved", "Multiple openings", "Comfortable padding"],
    originalPrice: 69.99,
    price: 54.99,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
    category: 'cat',
    description: "Safe and comfortable carrier for traveling with your cat.",
    rating: 4.6,
    reviews: 142,
    inStock: true
  }
];

const Cat: React.FC = () => {
  // Define filters
  const filters: Filter[] = [
    {
      name: 'type',
      label: 'Product Type',
      options: ['all', ...new Set(catProducts.map(p => p.type))],
      getValue: (product) => product.type
    },
    {
      name: 'brand',
      label: 'Brand',
      options: ['all', ...new Set(catProducts.map(p => p.brand))],
      getValue: (product) => product.brand
    },
    {
      name: 'feature',
      label: 'Feature',
      options: ['all', ...new Set(catProducts.flatMap(p => p.features))],
      getValue: (product) => product.features
    },
    {
      name: 'petSize',
      label: 'Size',
      options: ['all', ...new Set(catProducts.flatMap(p => p.petSize || []))],
      getValue: (product) => product.petSize || []
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: ['all', 'Under $25', '$25-$50', 'Over $50'],
      getFilteredProducts: (products, selectedValue) => {
        if (selectedValue === 'all') return products;
        
        return products.filter(product => {
          const price = product.price;
          switch (selectedValue) {
            case 'Under $25': return price < 25;
            case '$25-$50': return price >= 25 && price <= 50;
            case 'Over $50': return price > 50;
            default: return true;
          }
        });
      }
    }
  ];

  return (
    <CategoryTemplate
      title="Cat Products & Supplies"
      description="Everything your feline friend needs for a happy, healthy life"
      products={catProducts}
      filters={filters}
      className="cat-page"
      basePath="/product"
      showRating={true}
      showBrand={true}
    />
  );
};

export default Cat; 