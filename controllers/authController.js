const jwt = require("jsonwebtoken");
const User  = require("../models/usermodel");
const {hashPassword , comparePassword} = require("../utils/hash");
const sendEmail= require("../utils/sendmail");

const {createAccessToken , createRefreshToken , verifyAccessToken ,verifyRefreshToken} = require("../utils/createtokens");

const signup = async (req , res)=>{

	const {email , password} = req.body ;

	try{
		const hashedPassword = await hashPassword(password);
		const user = await User.create({email , password:hashedPassword });
		console.log(hashedPassword)
		
		return res.status(200).json({message:"user created successfully",user})
	
	}catch(err){
		return res.status(500).json({message:"error while saving user"})
	}
}
const chkemail = async (req, res) => {
  try {
    const { email } = req.body;

    //  Validate input
    if (!email)  return res.status(400).json({ success: false, message: "Email is required"}); 

    // Check if email exists
    const user = await User.findOne({ email });

    // Email already in use
    if (user) return res.status(409).json({ success: false, message: "Email already exists"});
    

    // Email can be used
    return res.status(200).json({ success: true, message: "Email can be used"});

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while searching in database"});
  }
};

const login = async (req , res)=>{



	try{
		const {email  , password} = req.body;
		const user = await User.findOne({email});
		
		if(!user) return res.status(401).json({message : "user not found"})

		const match = await comparePassword(password , user.password);

		if(!match) return res.status(401).json({message : "password not correct"})
		
	
		const accessToken = createAccessToken(user._id);
		
		const refreshToken = createRefreshToken(user._id);
		

		
res.cookie('accessToken', accessToken, {
  httpOnly: false,
  secure: false,          // ALWAYS true in production
  sameSite: 'Lax',    // Best protection for auth cookies
  path: '/',             // Required for Vercel
  maxAge: 15 * 60 * 1000,
});

res.cookie('refreshToken', refreshToken, {
  httpOnly: false,
  secure: false,          // ALWAYS true in production
  sameSite: 'Lax',    // Best protection for auth cookies
  path: '/',      
  maxAge: 55 * 60 * 1000,
});


		

		res.status(200).json({message:"loged in successfully",user})
	}catch(err){

		res.status(500).json({message:err.message})
	}
}

const loginOrNot = async (req , res)=>{

	console.log(req.cookies);
	const  accessToken = req.cookies.accessToken;
	console.log(accessToken)
	if(!accessToken)  return res.status(403).json({message:"token not found"});
	
	try{
	
		const payload = verifyAccessToken(accessToken);
		
		return res.status(200).json({message:"you are logged in" , user:{name:"nagah"}})
	
	}catch(err){
	
		if(err.name == "TokenExpiredError")  return res.status(403).json({message:"link is expired"});
			
		return res.status(401).json({message:"link is invalid"});
	
	}

}

const refresh = async (req , res)=>{
		
	const  refreshtoken = req.cookies.refreshToken;
	
	if(!refreshtoken)  return res.status(403).json({message:"token not found"});
		
	try{
		const payload = verifyRefreshToken(refreshtoken); 

		const token = createToken(payload.id);

		const user = await User.findOne({_id:payload.id});
		
		res.status(200).json({message:"refreshed access token",user,token })
		
	}catch(err){
	
		if(err.name == "TokenExpiredError") return res.status(401).json({message:"refresh token is expired"})
		
		else return res.status(403).json({message:"refresh token is invalid"})
		
	
	}
			
}


const logout = async(req,res)=>{
console.log("first logout fetched");
	console.log("from logout" , req.cookies)
        res.clearCookie('refreshToken',{
		  httpOnly: true,
		  secure: false,       // because no HTTPS locally
		  sameSite: 'Lax',     // 'Lax' or 'Strict' works fine for localhost
		});
            res.clearCookie('accessToken',{
		  httpOnly: true,
		  secure: false,       // because no HTTPS locally
		  sameSite: 'Lax',     // 'Lax' or 'Strict' works fine for localhost
		});
		
console.log("end logout fetched");		
    res.status(200).json({ message: 'Logged out successfully' });

}


const forgetPassword = async (req , res)=>{
	
	
	const {email} = req.body ;
	
	const user = await User.findOne({email})
	
	if(!user) return res.status(401).json({message : "user not found"});

	const token = jwt.sign({id:user._id} , process.env.SECRET_KEY , {expiresIn:"55m"}) ;
	
	const link = `http://localhost:5173/resetpassword/${token}` ;
		

	await sendEmail(email  , link)
	
	return res.status(200).json({message : "check your email for reset password link"});
	
	

}

const resetpassword = async (req , res)=>{
		
	const {password , token} = req.body ;
	try{
		const payload = jwt.verify(token ,process.env.SECRET_KEY );
		const { id } = payload ;
		const hashedPassword = await hashPassword(password);		
		
		await User.findByIdAndUpdate(id,{password:hashedPassword})
			
		return res.status(200).json({message : "password reset successfully"});
	
	}catch(err){
	
			if(err.name == "TokenExpiredError")  return res.status(403).json({message:"link is expired"});
			
			return res.status(401).json({message:"link is invalid"});
			
	}

}


module.exports = {
signup , 
login ,
loginOrNot,
refresh , 
logout ,
forgetPassword , 
resetpassword ,
chkemail ,

}
