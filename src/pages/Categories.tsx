import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import './All.scss'; // Reusing the All.scss styles

interface CategoryItem {
  name: string;
  image: string;
  link: string;
  category?: string;
  description?: string;
}

const Categories: React.FC = () => {
  const navigate = useNavigate();
  
  const categoryItems: Record<string, CategoryItem[]> = {
    pets: [
      {
        name: "Dog",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        link: "/pets/dog",
        category: "pets",
        description: "Food, toys, beds, and more for your canine companion"
      },
      {
        name: "Cat",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        link: "/pets/cat",
        category: "pets",
        description: "Food, litter, toys, and more for your feline friend"
      },
      {
        name: "Pet Supplies",
        image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGV0JTIwc3VwcGxpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        link: "/pets/supplies",
        category: "pets",
        description: "Grooming tools, carriers, and more for all pets"
      }
    ],
    electronics: [
      {
        name: "Smartphones",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        link: "/electronics/smartphones",
        category: "electronics",
        description: "Latest smartphones from top brands"
      },
      {
        name: "Laptops",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        link: "/electronics/laptops",
        category: "electronics",
        description: "Powerful laptops for work and play"
      },
      {
        name: "Accessories",
        image: "https://images.unsplash.com/photo-1625429970240-16b5752091ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3MlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        link: "/electronics/accessories",
        category: "electronics",
        description: "Chargers, cases, headphones, and more"
      }
    ],
    clothing: [
      {
        name: "Men's",
        image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        link: "/clothing/mens",
        category: "clothing",
        description: "Stylish clothing for men"
      },
      {
        name: "Women's",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        link: "/clothing/womens",
        category: "clothing",
        description: "Trendy clothing for women"
      },
      {
        name: "Jeans",
        image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGplYW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        link: "/clothing/jeans",
        category: "clothing",
        description: "Quality jeans for men and women"
      },
      {
        name: "Shirts",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        link: "/clothing/shirts",
        category: "clothing",
        description: "Casual and formal shirts"
      },
      {
        name: "Hats",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGF0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        link: "/clothing/hats",
        category: "clothing",
        description: "Stylish hats and caps"
      },
      {
        name: "Dresses",
        image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHJlc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        link: "/clothing/dresses",
        category: "clothing",
        description: "Beautiful dresses for all occasions"
      }
    ]
  };

  // Combine all categories for display
  const allCategories = [
    ...categoryItems.pets,
    ...categoryItems.electronics,
    ...categoryItems.clothing
  ];

  const handleNavigation = (item: CategoryItem) => {
    navigate(item.link);
  };

  return (
    <div className="home-page">
      <section className="shop-by-category">
        <h1>Browse All Categories</h1>
        <p className="category-description">Find what you're looking for by browsing our product categories.</p>
        
        <h2>Pets</h2>
        <div className="categories-grid">
          {categoryItems.pets.map((category, index) => (
            <CategoryCard
              key={`pet-${index}`}
              name={category.name}
              image={category.image}
              link={category.link}
              category="pets"
              description={category.description}
              onClick={() => handleNavigation(category)}
            />
          ))}
        </div>
        
        <h2>Electronics</h2>
        <div className="categories-grid">
          {categoryItems.electronics.map((category, index) => (
            <CategoryCard
              key={`electronics-${index}`}
              name={category.name}
              image={category.image}
              link={category.link}
              category="electronics"
              description={category.description}
              onClick={() => handleNavigation(category)}
            />
          ))}
        </div>
        
        <h2>Clothing</h2>
        <div className="categories-grid">
          {categoryItems.clothing.map((category, index) => (
            <CategoryCard
              key={`clothing-${index}`}
              name={category.name}
              image={category.image}
              link={category.link}
              category="clothing"
              description={category.description}
              onClick={() => handleNavigation(category)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories; 