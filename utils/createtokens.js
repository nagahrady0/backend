const jwt = require("jsonwebtoken");

const createAccessToken = (userId)=>  jwt.sign({id:userId}  , process.env.SECRET_KEY , {expiresIn:"15m"}) 


const createRefreshToken = (userId)=>  jwt.sign({id:userId}  , process.env.SECRET_REFRESH_KEY , {expiresIn:"55m"}) 


const verifyAccessToken = (token)=>  jwt.verify(token, process.env.SECRET_KEY ) 


const verifyRefreshToken = (token)=>  jwt.verify(token , process.env.SECRET_REFRESH_KEY ) 

module.exports = {

createAccessToken,

createRefreshToken,

verifyAccessToken,

verifyRefreshToken

}
