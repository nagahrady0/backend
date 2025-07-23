const User  = require("../models/usermodel");
const {hashPassword , comparePassword} = require("../utils/hash");

const jwt = require("jsonwebtoken");

const createToken = (userId)=>  jwt.sign({id:userId}  , process.env.SECRET_KEY) 

const signup = async (req , res)=>{

	const {email , password} = req.body ;

	try{
		const hashedPassword = await hashPassword(password);
		const user = await User.create({email , password:hashedPassword });
		console.log(hashedPassword)
		
		return res.status(200).json(user)
	
	}catch(err){
		return res.status(500).json({message:"error while saving user"})
	}
}

const login = async (req , res)=>{

	try{
		const {email  , password} = req.body;
		const user = await User.findOne({email});
		
		if(!user) return res.status(401).json({message : "user not found"})
		
		const match = await comparePassword(password , user.password);

		if(!match) return res.status(401).json({message : "password not correct"})
		
	
		const token = createToken(user._id)

		res.status(200).json({user,token})
	}catch(err){

		res.status(500).json({message:err.message})
	}
}


module.exports = {
signup , 
login ,
}
