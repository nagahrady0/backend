const Project  = require("../models/projectmodel")

const createProject = async (req , res)=>{

	const {title , description , github , life} = req.body ;
	const image = req.file?.filename;
	try{

		const project = await Project.create({title , description , github , life , image});

		res.status(200).json(project)
	
	}catch(err){

		res.status(500).json({error:"error while saving project"})
	}

}

const getProjects = async (req , res)=>{

	try{
		const project = await Project.find();

		res.status(200).json(project)
	}catch(err){

		res.status(500).json({error:"error while get all projects"})
	}
}


module.exports = {
createProject , 
getProjects ,

}
