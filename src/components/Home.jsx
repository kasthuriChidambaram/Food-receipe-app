import React, { useEffect, useState } from 'react';
import Header from './Header';
import RecipeCard from './RecipeCard';
import './Home.css';
import './Home.mobile.css';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x200?text=Recipe+Image';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, name, category, image_url');
      if (!error) {
        setRecipes(data);
      }
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <main className="home">
        <section className="hero">
          <h1>Truly 100% Vegetarian Recipes — Indian & Global</h1>
          <p>
            Discover a collection of authentic vegetarian recipes, rooted in
            tradition and created with care. From everyday Indian meals to
            wholesome global dishes and eggless baking, each recipe is tested in
            my kitchen and shared with step-by-step photos to make cooking feel
            simple and rewarding. Tried, trusted, and always vegetarian – it's
            food you can rely on.
          </p>
        </section>
        <section className="reader-favorites">
          <h2>Reader Favorites</h2>
          <p>Our favorites and our readers' favorites!</p>
          {recipes.length === 0 ? (
            <div style={{textAlign: 'center', margin: '2rem 0', fontSize: '1.5rem', color: '#888'}}>
              Welcome! No recipes found. Add some recipes to get started.
            </div>
          ) : (
            <div className="recipe-list">
              {recipes.map((recipe) => (
                <div key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)} style={{ cursor: 'pointer' }}>
                  <RecipeCard
                    recipe={{
                      ...recipe,
                      image: recipe.image_url || PLACEHOLDER_IMAGE,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home; 