import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setError('Please enter the field');
      setRecipes([]);
      return;
    }

    setError(''); // Clear error on valid input

    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&addRecipeInformation=true&apiKey=${import.meta.env.VITE_API_KEY}`
      );
      const data = await res.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="hero">
      <div className="overlay">
        <div className="container">
          <h1 className="title">🍴 TastyQuest</h1>
          <p className="tagline">Craving something delicious? Find recipes that match your mood!</p>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Try ‘Pasta’, ‘Chicken’, or ‘Salad’..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                  View Recipe →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
