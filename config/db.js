const mongoose = require("mongoose");

const connection = async()=>{
	
	try{
		await mongoose.connect(process.env.URI)
		console.log("db connected")
		
	}catch(err){
	
		console.error("connection failed : " , err.message )
	
	}


}


module.exports = connection ;


