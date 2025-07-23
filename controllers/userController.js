const User  = require("../models/usermodel");


const getUser = async (req , res)=>{
	
	try{
		const user = await User.findOne({ _id: req.userId });
		
		return res.status(200).json({user});
		
	}catch(err){
		res.status(500).json({message:err.message})
	}
}

module.exports = getUser ;
