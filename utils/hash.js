const bcrypt = require("bcrypt");


const salt = 10 ; 

const hashPassword = async ( password ) => await bcrypt.hash(password , salt) ;



const comparePassword = async (password , hashedPassword) => await bcrypt.compare(password , hashedPassword);


module.exports = {
	
	hashPassword ,
	
	comparePassword 

}



