const Project  = require("../models/projectmodel")

const createProject = async (req , res)=>{

	const {title , type , github , life , technology} = req.body ;
	const image = req.file?.filename;
	try{

		const project = await Project.create({title , type , github , life , technology ,image});

		res.status(200).json({message:"project created successfully" , project })
	
	}catch(err){

		res.status(500).json({message :"error while saving project"})
	}

}

const getProjects = async (req , res)=>{

	try{
		const project = await Project.find();
		
		res.status(200).json({message:"success" , project})
	}catch(err){

		res.status(500).json({error:"00000000000error while get all projects"})
	}
}

const getProject = async (req , res)=>{

	try{
		const project = await Project.findById(req.params.id);
		
		res.status(200).json({message:"success" , project})
	}catch(err){

		res.status(500).json({error:"error while get this project"})
	}
}

const deleteProject = async (req , res)=>{
	console.log("fetch deleted")
	try{
		console.log("id==>" ,req.params.id)
		const deletedItem = await Project.findByIdAndDelete(req.params.id) ;
	
		if(!deletedItem) return res.status(404).json({error:"project not found so id not true"})
	
		return res.status(200).json({message:"project deleted uccessfully"})
		
	}catch(err){
		
		return res.status(500).json({error : err})
	}
	
}


const updateProject = async (req , res)=>{
	
	const id = req.params.id ; 
	const {title , type , github , life , technology} = req.body ;
	const image = req.file?.filename;
	try{

		const project = await Project.findByIdAndUpdate(id,{title , type , github , life , technology , image});

		res.status(200).json({message:"project updated successfully" , project })
	
	}catch(err){

		res.status(500).json({message :"error while updated project"})
	}

}


module.exports = {
createProject , 
getProjects ,
getProject ,
deleteProject ,
updateProject,
}
