const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipes' }] // Reference to the Recipe model
});





module.exports = mongoose.model("Users", UserSchema);