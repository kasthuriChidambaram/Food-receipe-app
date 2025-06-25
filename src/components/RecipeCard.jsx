import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt="Recipe" className="recipe-image" />
      <div className="recipe-details">
        <div className="recipe-category">
          <span className="category-icon">🌿</span>
          {recipe.category}
        </div>
        <h3 className="recipe-name">{recipe.name}</h3>
      </div>
    </div>
  );
};

export default RecipeCard; 