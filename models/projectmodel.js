const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
	"title":String,
	"description":String,
	"github":String,
	"life":String,
	"image":String,

})


const Project = mongoose.model("Project" , projectSchema)


module.exports =   Project ;
