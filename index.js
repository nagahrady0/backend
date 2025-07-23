require("dotenv").config()

const express = require("express");



const path = require('path');
const cors = require('cors');



const connection = require("./config/db");

const projectRoutes = require("./routes/projectRoutes");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();




// middlewares 

app.use(express.urlencoded({extended : true}));

app.use("/uploads" , express.static("uploads"));

app.use(cors()) ;

app.use(express.static(path.join(__dirname,"public")));

app.use('/' , projectRoutes) ;

app.use('/auth/' , authRoutes) ;

  app.use('/' , userRoutes) ;

// end middlewares


// connected to db

connection();

// end connection

app.listen(process.env.PORT || 3000 , ()=>{

	console.log("server is running");

})
