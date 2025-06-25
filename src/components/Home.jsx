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
          <h1>South Indian Cuisine: A Legacy of Dynasties and Flavors</h1>
          <p>
          South Indian cuisine is deeply rooted in history, dating back to the glorious reigns of the Pandyas, Cholas, and Cheras.
Ancient Sangam literature and temple inscriptions mention daily staples like rice, millet, lentils, curd, and ghee.
Royal kitchens of the Cholas were known for elaborate feasts with dishes flavored using pepper, turmeric, and coconut.
The Chera dynasty, with their access to the spice-rich Western Ghats, introduced aromatic curries and coconut-based gravies.
Trade routes through ancient ports like Poompuhar and Muziris brought in spices and culinary influences from across the seas.
Meals were traditionally served on banana leaves — a practice that continues even today in festive and everyday settings.
From soft idlis steamed in earthen pots to fiery Chettinad curries, each region developed its own distinctive flavors.
Temple towns like Madurai and Thanjavur preserved not only heritage but also sacred food practices like prasadam preparation.
Even modern-day South Indian kitchens echo the past, with techniques and recipes passed down through generations.
More than just food, it is a living tradition — a celebration of culture, community, and centuries-old wisdom on every plate.
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