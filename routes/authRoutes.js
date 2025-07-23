const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const {login , signup} = require("../controllers/authController");


router.post("/login", upload.none(),login)

router.post("/signup" , upload.none(),signup)




module.exports = router
