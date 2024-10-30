const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const RecipesRouter = require("./routes/RecipeRoute");

const dotenv = require("dotenv");
dotenv.config();

const app = express();


app.use(express.json()); // Convert data of frontend to JSON
app.use(cors()); // communication between frontend and backend 


app.use("/auth", userRouter)
app.use("/recipes", RecipesRouter)


//mongodb connection
mongoose.connect(process.env.URI)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));


// Start the server on port 3001
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
