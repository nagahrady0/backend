const jwt = require("jsonwebtoken");

const authMiddleware = (req , res , next)=>{

	const authHeader = req.headers.authorization;
	const  token = authHeader && authHeader.split(" ")[1];

	if(!token) return res.status(401).json({message:"token not found"});
	
	
	jwt.verify(token ,process.env.SECRET_KEY , (err , userId)=>{

		if(err)  return res.status(403).json({message:"token is invalid"});
				
		req.userId = userId.id ;

		next();
		
	});
		
	

}

module.exports = authMiddleware
