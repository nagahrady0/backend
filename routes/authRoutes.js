const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const {
	login , 
	signup , 
	loginOrNot,
	chkemail , 
	forgetPassword  ,
	resetpassword , 
	refresh , 
	logout
} = require("../controllers/authController");


router.post("/signup" , upload.none(),signup)

router.post("/login", upload.none(),login)

router.post("/logout", upload.none(),logout)

router.post("/chkemail" , upload.none(),chkemail)

router.post("/loginornot" , upload.none(),loginOrNot)

router.post("/refresh", upload.none(),refresh)

router.post("/forgetpassword",  upload.none(),forgetPassword) ; 

router.post("/resetpassword", upload.none(), resetpassword) ; 

module.exports = router
