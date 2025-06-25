import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import './RecipeDetail.css';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x200?text=Recipe+Image';

function formatList(text) {
  if (!text) return [];
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) setRecipe(data);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <>
      <button onClick={() => navigate('/')} className="home-button">
        ← Back to Home
      </button>
      <div className="recipe-card-container">
        <div className="recipe-card-left">
          <img
            src={recipe.image_url || PLACEHOLDER_IMAGE}
            alt="Recipe"
            className="recipe-card-image"
          />
          <div className="recipe-card-ingredients-title">Ingredients</div>
          <ul className="recipe-card-ingredients-list">
            {formatList(recipe.ingredients).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-card-right">
          <div className="recipe-card-title">{recipe.name}</div>
          <div style={{ marginBottom: 16, fontStyle: 'italic' }}>
            {recipe.description}
          </div>
          <div className="recipe-card-section-title">Directions</div>
          <div className="recipe-card-instructions-list">
            {formatList(recipe.instructions).map((step, idx) => (
              <div key={idx} className="recipe-card-instruction-step">{step}</div>
            ))}
          </div>
          {recipe.notes && (
            <>
              <div className="recipe-card-section-title">Recipe Notes</div>
              <div>{recipe.notes}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeDetail; 