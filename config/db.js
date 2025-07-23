const mongoose = require("mongoose");

const connection = async()=>{
	
	try{
		await mongoose.connect(process.env.URI)
	
		
	}catch(err){
	
		console.error("connection failed : " , err.message )
	
	}


}


module.exports = connection ;


