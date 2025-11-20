const nodemailer = require("nodemailer")


const mail = {

	service : process.env.SERVICE ,
	
	auth : {
	
		user : process.env.USERNAMEE , 
		pass : process.env.PASSWORD
	
	}



} ;

const transporter = nodemailer.createTransport(mail)


module.exports = transporter ;


