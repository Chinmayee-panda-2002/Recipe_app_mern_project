const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    ingredients: [{ 
        type: String, 
        required: true 
    }],
    instruction: { 
        type: String, 
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    cookingTime: { 
        type: Number, 
        required: true 
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

module.exports = mongoose.model("Recipes", RecipeSchema);