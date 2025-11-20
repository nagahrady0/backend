const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const authMiddleware = require("../middlewares/authmiddleware")

const {createProject , getProjects , getProject , deleteProject , updateProject} = require("../controllers/projectController");

router.get("/getprojects" ,  getProjects);

router.get(`/projects/:id` ,  getProject);

router.post("/addproject",  authMiddleware , upload.single("image") , createProject)


router.post(`/projects/update/:id`,  authMiddleware , upload.single("image") , updateProject) ;


router.delete(`/projects/delete/:id` , authMiddleware , deleteProject )



module.exports = router
