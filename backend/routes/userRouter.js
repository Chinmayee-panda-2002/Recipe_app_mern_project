const express = require("express");
const UserModel = require("../models/Users"); 
const router = express.Router(); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();


//registration

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    const user = await UserModel.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "User already exists" }); // 400 for bad request
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." }); // 201 for created
});

//login
router.post("/login", async (req, res) =>{
    const {username, password } = req.body;

    const user = await UserModel.findOne({username});
    if(!user){
        return res.json({message : "User not found"})
    }

    const idPasswordValid = await bcrypt.compare(password, user.password);
    if(!idPasswordValid){
        return res.json({message : "incorrect username and password"});
    }

    const token = jwt.sign({ id: user._id }, process.env.secret_key);

    res.json({token, userId: user._id});
    // res.json({message:"User login successfully."})
})




module.exports = router; 
