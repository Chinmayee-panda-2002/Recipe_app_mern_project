const express = require("express");
const RecipeModel = require("../models/Recipes");
const UserModel = require("../models/Users");
const mongoose = require("mongoose");

const router = express.Router();

//create a new recipe
router.post("/", async (req, res) => {
    const { name, ingredients, instruction, imageUrl, cookingTime, userOwner } = req.body;

    try {
        const ownerId = new mongoose.Types.ObjectId(userOwner);
        const newRecipe = new RecipeModel({
            name,
            ingredients,
            instruction,
            imageUrl,
            cookingTime,
            userOwner: ownerId,
        });             // or [    const newRecipe = new RecipeModel(req.body);   ]

        await newRecipe.save();
        res.status(201).json({ message: "Recipe created successfully", recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the recipe", error: error.message });
    }
});

// GET all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await RecipeModel.find(); // Fetch all recipes 
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching recipes", error: error.message });
    }
});



// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
    try {
        const result = await RecipeModel.findById(req.params.recipeId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Save a Recipe
router.put("/", async (req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });

        console.log(savedRecipes);
        res.status(201).json({ savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});





//adding new feature
// DELETE endpoint to unsave a recipe
// DELETE endpoint to unsave a recipe
router.delete('/', async (req, res) => {
    const { recipeID, userID } = req.body;
    try {
      await UserModel.findByIdAndUpdate(
        userID,
        { $pull: { savedRecipes: recipeID } },
        { new: true }
      );
  
      // Fetch the updated saved recipes from the user document
      const updatedUser = await UserModel.findById(userID);
      
      res.json({ savedRecipes: updatedUser.savedRecipes }); // Ensure this returns the current saved recipes
    } catch (err) {
      res.status(500).send(err);
    }
  });
  






module.exports = router;
