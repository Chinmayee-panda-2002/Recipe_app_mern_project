import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3001/recipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSavedRecipes(data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await fetch("http://localhost:3001/recipes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeID,
          userID,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSavedRecipes(data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      <h1>Recipes</h1>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="recipe-item">
            <div className="recipe-header">
              <h2 className="recipe-title">{recipe.name}</h2>
              <button
                className={`save-button ${isRecipeSaved(recipe._id) ? "saved" : ""}`}
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img className="recipe-image" src={recipe.imageUrl} alt={recipe.name} />
            <p className="cooking-time">Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
