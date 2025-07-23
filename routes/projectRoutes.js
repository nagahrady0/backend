const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const authMiddleware = require("../middlewares/authmiddleware")
const {createProject , getProjects} = require("../controllers/projectController");


router.post("/addproject",  authMiddleware , upload.single("image") , createProject)


router.get("/getprojects" ,  getProjects)


module.exports = router
