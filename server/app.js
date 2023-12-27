const dotenv = require('dotenv');
const mongoose =require('mongoose');
const express = require("express");
const app =express();
const cookieParser = require('cookie-parser');
dotenv.config({path:'./config.env'});
const PORT = process.env.PORT;

require('./db/conn.js');

//User model
require('./model/userSchema');

//Router access
app.use(express.json());
app.use(require('./route/auth'));

//Middleware
//Ex:- before jumping into any page if we want to validate the user is logged in or not
//we gonna use middleware
const middleware = (req,res,next) =>
{
	console.log("Middleware");
	next();
}

app.get("/",(req,res)=>
	{
		res.send("Hello Server")
	})
app.get("/contact",(req,res)=>
	{
		res.send("Hello Contact")
	})
app.get("/signup",(req,res)=>
	{
		res.send("Signup Page")
	})
app.get("/signout",(req,res)=>
	{
		res.send("Signout page")
	})

app.listen(PORT,()=>
{
	console.log(`Server running in ${PORT} port`);
})