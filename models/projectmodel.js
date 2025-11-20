const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
	"title":String,
	"github":String,
	"life":String,
	"image":String,
	"type":String,
	"technology":String,
	
})


const Project = mongoose.model("Project" , projectSchema)


module.exports =   Project ;
