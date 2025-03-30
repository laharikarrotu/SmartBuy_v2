import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.scss';

interface CategoryCardProps {
  name: string;
  image: string;
  link: string;
  category?: 'electronics' | 'clothing' | 'pets' | string;
  description?: string;
  onClick?: () => void;
  badge?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  image,
  link,
  category = '',
  description,
  onClick,
  badge
}) => {
  const cardClass = `category-card ${category ? `category-card--${category}` : ''}`;
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link to={link} className={cardClass} onClick={handleClick}>
      <div className="category-card__image">
        <img src={image} alt={name} />
      </div>
      <div className="category-card__overlay"></div>
      <div className="category-card__content">
        <h3 className="category-card__title">{name}</h3>
        {description && <p className="category-card__subtitle">{description}</p>}
      </div>
      {badge && <span className="category-card__badge">{badge}</span>}
    </Link>
  );
};

export default CategoryCard; 