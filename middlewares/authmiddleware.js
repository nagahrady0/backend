const { verifyAccessToken } = require("../utils/createtokens");

const authMiddleware = (req , res , next)=>{

	const token = req.cookies.accessToken ;
	

	if(!token) {

		return res.status(401).json({message:"token not found"});
		
		}
	
	try{
		const payload = verifyAccessToken(token)
		
		req.userId = payload.id
		next();
		
	}catch(err){
	
		if(err.name == "TokenExpiredError"){
		return res.status(401).json({message:"token is expired"})
		
		}
		else{
		
		return res.status(403).json({message:"token is invalid"})
		}
	
	}
	
		
	

}

module.exports = authMiddleware





