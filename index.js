require("dotenv").config()

const express = require("express");



const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');




const connection = require("./config/db");



const projectRoutes = require("./routes/projectRoutes");  

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");




const app = express();




// middlewares 
 
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());

app.use(cors({

	origin:"http://localhost:5173",
	credentials : true

})) ;



app.use("/uploads" , express.static("uploads"));



app.use(express.static(path.join(__dirname,"public")));

app.use('/' , projectRoutes) ;

app.use('/auth/' , authRoutes) ;

app.use('/' , userRoutes) ;




// end middlewares


// connected to db

connection();

// end connection

const port = process.env.PORT || 3000 ;
app.listen( port , ()=>{

	console.log(`server is running http://localhost:${port}`);
	

})
