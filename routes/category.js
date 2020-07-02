const express = require("express");
const router = express.Router();

const{getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category");
const{isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth");
const{getUserById} = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Actual routes goes here

//Actual Route
router.post("/category/create/:userId",isSignedIn, isAuthenticated, isAdmin, createCategory);
//Read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
//update
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
//Delete
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);


module.exports =router;