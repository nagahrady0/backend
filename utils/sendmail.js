const transporter = require("../config/mail") ;




const sendEmail = async (to , link )=>{

	await transporter.sendMail({
	
		from : process.env.USERNAMEE, 
		to,
		subject:"reset your password",
		html:`<p>open the link on your browser to reset your password ${link}</p>`
	
	
	});




}


module.exports = sendEmail ;
