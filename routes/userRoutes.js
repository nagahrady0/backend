const express = require("express");

const router = express.Router();



const authMiddleware = require("../middlewares/authmiddleware")

const  getUser = require("../controllers/userController");




router.get("/user" ,authMiddleware,  getUser)




module.exports = router
