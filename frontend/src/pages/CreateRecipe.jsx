import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";

export const CreateRecipe = () => {
  const userID = useGetUserID();      //present inside hooks/useGetUserID
  const [cookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!userID) {
        alert("Please login to create a recipe");
        navigate("/login");
        return;
      }

      // Validate required fields
      if (!recipe.name || !recipe.instruction || !recipe.imageUrl || !recipe.cookingTime) {
        alert("Please fill in all required fields");
        return;
      }

      // Remove any empty ingredients
      const filteredIngredients = recipe.ingredients.filter(ing => ing.trim() !== "");
      if (filteredIngredients.length === 0) {
        alert("Please add at least one ingredient");
        return;
      }

      const recipeToSubmit = {
        ...recipe,
        ingredients: filteredIngredients
      };

      const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
        body: JSON.stringify(recipeToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create recipe");
      }

      const data = await response.json();
      alert("Recipe Created Successfully!");
      navigate("/home");

    } catch (error) {
      console.error("Error creating recipe:", error);
      alert(error.message || "Failed to create recipe. Please try again.");
    }
  };
  //handle onchange for each field in form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };
  // add ingridient
  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="ingredients">Ingredients*</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
            required
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>

        <label htmlFor="instruction">Instructions*</label>
        <textarea
          id="instruction"
          name="instruction"
          value={recipe.instruction}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="imageUrl">Image URL*</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          required
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)*</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;