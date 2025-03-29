import React from 'react';
import { useSavedItems } from '../../contexts/SavedItemsContext';
import './SaveButton.scss';

interface SaveButtonProps {
  productId: number;
  className?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ productId, className = '' }) => {
  const { isSaved, addToSavedItems, removeFromSavedItems } = useSavedItems();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved(productId)) {
      removeFromSavedItems(productId);
    } else {
      // Note: In a real application, you would need to pass the full product object
      // This is just a placeholder
      addToSavedItems({
        id: productId,
        name: '',
        price: 0,
        image: '',
        category: ''
      });
    }
  };

  return (
    <button 
      className={`save-button ${isSaved(productId) ? 'saved' : ''} ${className}`}
      onClick={handleClick}
      aria-label={isSaved(productId) ? 'Remove from saved items' : 'Save for later'}
    >
      <span className="material-symbols-outlined">
        {isSaved(productId) ? 'favorite' : 'favorite_border'}
      </span>
    </button>
  );
};

export default SaveButton; 