export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'clothing' | 'electronics' | 'dog' | 'cat';
  description: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  tag?: string;
  type?: string;
  colors?: string[];
  sizes?: string[];
  shipping?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
  subcategories?: string[];
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  discount: string;
  validUntil?: string;
}

export const categories: Record<string, Category[]> = {
  pets: [
    {
      id: 'dog',
      name: 'Dog',
      image: '/images/categories/dog.jpg',
      description: 'Everything you need for your dog',
      link: '/dog',
      subcategories: ['Food', 'Toys', 'Accessories', 'Health']
    },
    {
      id: 'cat',
      name: 'Cat',
      image: '/images/categories/cat.jpg',
      description: 'Everything you need for your cat',
      link: '/cat',
      subcategories: ['Food', 'Toys', 'Accessories', 'Health']
    }
  ],
  electronics: [
    {
      id: 'smartphones',
      name: 'Smartphones',
      image: '/images/categories/smartphones.jpg',
      description: 'Latest smartphones and accessories',
      link: '/electronics/smartphones',
      subcategories: ['Phones', 'Cases', 'Accessories']
    },
    {
      id: 'laptops',
      name: 'Laptops',
      image: '/images/categories/laptops.jpg',
      description: 'High-performance laptops and accessories',
      link: '/electronics/laptops',
      subcategories: ['Laptops', 'Accessories', 'Software']
    }
  ],
  clothing: [
    {
      id: 'mens',
      name: "Men's",
      image: '/images/categories/mens.jpg',
      description: "Men's fashion and accessories",
      link: '/clothing/mens',
      subcategories: ['Tops', 'Bottoms', 'Accessories', 'Shoes']
    },
    {
      id: 'womens',
      name: "Women's",
      image: '/images/categories/womens.jpg',
      description: "Women's fashion and accessories",
      link: '/clothing/womens',
      subcategories: ['Tops', 'Bottoms', 'Accessories', 'Shoes']
    }
  ]
};

export const deals: Deal[] = [
  {
    id: 'd1',
    title: 'Save 30% on select dog toys',
    description: 'Get up to 30% off on premium dog toys',
    image: '/images/deals/dog-toys.jpg',
    link: '/dog/toys',
    category: 'dog',
    discount: '30% OFF',
    validUntil: '2024-04-30'
  },
  {
    id: 'd2',
    title: 'Buy 1, Get 1 50% off cat treats',
    description: 'Stock up on your cat\'s favorite treats',
    image: '/images/deals/cat-treats.jpg',
    link: '/cat/treats',
    category: 'cat',
    discount: 'BOGO 50%',
    validUntil: '2024-04-30'
  },
  {
    id: 'd3',
    title: 'Up to 40% off selected smartphones',
    description: 'Latest smartphones at great prices',
    image: '/images/deals/smartphones.jpg',
    link: '/electronics/smartphones',
    category: 'electronics',
    discount: '40% OFF',
    validUntil: '2024-04-30'
  },
  {
    id: 'd4',
    title: 'Spring Collection - 25% off new arrivals',
    description: 'Fresh spring styles at discounted prices',
    image: '/images/deals/spring-collection.jpg',
    link: '/clothing/spring',
    category: 'clothing',
    discount: '25% OFF',
    validUntil: '2024-04-30'
  }
];

export const products: Record<string, Product[]> = {
  dog: [
    {
      id: 'd1',
      name: 'Premium Dog Food',
      price: 49.99,
      originalPrice: 59.99,
      image: '/images/products/dog/premium-food.jpg',
      category: 'dog',
      description: 'High-quality dog food with natural ingredients.',
      features: ['Natural ingredients', 'Grain-free', 'Rich in protein'],
      specifications: {
        'Weight': '20 lbs',
        'Suitable For': 'All breeds',
        'Life Stage': 'Adult'
      },
      reviews: 2693,
      rating: 4.8,
      brand: 'Purina Pro Plan',
      shipping: 'Free shipping on orders over $50',
      inStock: true
    },
    {
      id: 'd2',
      name: 'Comfort Dog Bed',
      price: 79.99,
      image: '/images/products/dog/comfort-bed.jpg',
      category: 'dog',
      description: 'Plush dog bed with memory foam support.',
      sizes: ['Small', 'Medium', 'Large'],
      features: ['Memory foam', 'Machine washable', 'Water resistant'],
      specifications: {
        'Material': 'Polyester, Memory Foam',
        'Care': 'Machine washable',
        'Origin': 'Made in USA'
      },
      reviews: 768,
      rating: 4.7,
      brand: 'PetSmart',
      shipping: 'Free shipping on orders over $50',
      inStock: true
    }
  ],
  cat: [
    {
      id: 'c1',
      name: 'Premium Cat Food',
      price: 39.99,
      image: '/images/products/cat/premium-food.jpg',
      category: 'cat',
      description: 'High-quality cat food with natural ingredients.',
      features: ['Natural ingredients', 'Grain-free', 'Rich in protein'],
      specifications: {
        'Weight': '15 lbs',
        'Suitable For': 'All breeds',
        'Life Stage': 'Adult'
      },
      reviews: 937,
      rating: 4.5,
      brand: 'Blue Buffalo',
      shipping: 'Free shipping on orders over $50',
      inStock: true
    }
  ],
  electronics: [
    {
      id: 'e1',
      name: 'Wireless Earbuds Pro',
      price: 149.99,
      image: '/images/products/electronics/wireless-earbuds.jpg',
      category: 'electronics',
      description: 'Premium wireless earbuds with noise cancellation.',
      features: ['Active noise cancellation', '24-hour battery life', 'Water resistant'],
      specifications: {
        'Battery Life': 'Up to 24 hours with case',
        'Connectivity': 'Bluetooth 5.0',
        'Water Resistance': 'IPX4'
      },
      reviews: 1245,
      rating: 4.6,
      brand: 'TechPro',
      shipping: 'Free shipping on orders over $50',
      inStock: true
    }
  ],
  clothing: [
    {
      id: 'c1',
      name: 'Baby Boot Jean',
      price: 29.99,
      image: '/images/products/clothing/baby-boot-jean.jpg',
      category: 'clothing',
      description: 'Classic baby boot cut jeans with comfortable stretch fabric.',
      sizes: ['0-3M', '3-6M', '6-9M', '9-12M'],
      features: ['Stretch denim', 'Easy snap closure', 'Machine washable'],
      specifications: {
        'Material': '98% Cotton, 2% Spandex',
        'Care': 'Machine wash cold, tumble dry low',
        'Origin': 'Made in USA'
      },
      reviews: 760,
      rating: 4.6,
      brand: 'Gap',
      shipping: 'Free shipping on orders over $50',
      inStock: true
    }
  ]
};

// Helper function to find a product by ID
export const findProductById = (id: string): Product | undefined => {
  for (const categoryProducts of Object.values(products)) {
    const product = categoryProducts.find(p => p.id === id);
    if (product) return product;
  }
  return undefined;
};

// Helper function to find a product by category and ID
export const findProductByCategoryAndId = (category: string, id: string): Product | undefined => {
  const categoryProducts = products[category];
  if (!categoryProducts) return undefined;
  return categoryProducts.find(p => p.id === id);
}; 