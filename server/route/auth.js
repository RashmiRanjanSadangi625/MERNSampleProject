const express =  require('express');
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const authenticate = require('../middleware/authenticate');

router.use(cookieParser());
router.get("/",(req,res)=>
	{
		res.send("Hii from router page")
	})           
//Promise way of handling register

// router.post("/register",(req,res) =>
// 	{
// 		//object destructring
// 		const {name, email, phone, work, password, cpassword} = req.body;
// 		// Check whether the fields are empty
// 		if(!name || !email || !phone || !work || !password || !cpassword)
// 		{
// 			res.status(500).json({message:"Please filll al the details !"});
// 		}
// 
// 		//Check is there any data in the same email
// 		User.findOne({email:email})
// 		.then((userExist)=>{
// 			if(userExist)
// 				{
// 					return res.status(422).json({message:"User already exist !"})
// 				}
// 			
// 			const user =new User({name, email, phone, work, password, cpassword});
// 			user.save().then(()=>{
// 				res.status(201).json({message:"Registered Succefully !"});
// 
// 			}).catch((err)=> res.status(500).json({error:"Failed to register !"}))
// 		}).catch((err) => {console.log(err);})
// 
// 
// 	})
// Async-Await way of handling register
router.post("/register",async (req,res) =>
	{
		try
		{
			//object destructring
			const {name, email, phone, work, password, cpassword} = req.body;
			// Check whether the fields are empty
			if(!name || !email || !phone || !work || !password || !cpassword)
			{
				res.status(500).json({message:"Please filll al the details !"});
			}

			//Check is there any data in the same email
			const userExist = await User.findOne({email:email})
				if(userExist)
				{
					return res.status(422).json({message:"User already exist !"})
				}
				
				const user =new User({name, email, phone, work, password, cpassword});
				//--->Used pre method in userSchema file to execute pre method before executing save method
				await user.save()
				
				res.status(201).json({message:"Registered Succefully !"});

		}catch (err) {
			console.log(err);
		}
	})

//User login
router.post("/signin",async (req,res) =>
{
	try
	{
		const {email, password} = req.body;
		// Check whether the fields are empty
		if(!email || !password)
		{
			res.status(400).json({message:"Please fill al the details !"});
		}
		const userExist = await User.findOne({email:email});
		if (userExist)
		{
			const checkPass = await bcrypt.compare(password,userExist.password);
			const token = await userExist.generateAuthToken();
			console.log(token);
			res.cookie("jwtoken",token,{
				expires:new Date(Date.now() + 2592000000),
				httpOnly:true
			});
			if(checkPass)
			{
				return res.status(201).json({message:"Succesfully Logged In"})
			}
			else
			{
				return res.status(400).json({message:"Invalid Credentials !"})
			}
		}
		else
		{
			return res.status(400).json({message:"User does not exist !"})
		}

	}
	catch(err)
	{
		console.log(err);
	}
})

//About us page
router.get("/about",authenticate,(req,res)=>
	{
		console.log("About")
		res.send(req.rootUser);
	})

//get user data
router.get("/getdata",authenticate,(req,res)=>
	{
		console.log("About")
		res.send(req.rootUser);
	})

//ser contact message data
router.post("/contact",authenticate,async (req,res)=>
	{
		try
		{
			const { name,email,phone,message} = req.body;

			if (!name || !email || !phone || !message)
			{
				console.log("Fill the form details !")
				res.json({error:"Fill the form details !"})
			}

			const userContact = await User.findOne({_id:req.userID});

			if(userContact)
			{
				const userMessage = await userContact.addMessage(name,email,phone,message);
				await userContact.save();

				res.status(201).json({message:"contact form submitted!"})
			}
		}
		catch(err)
		{
			console.log(err)
		}

	})

//homepage user data
router.get("/home",authenticate,(req,res)=>
	{
		console.log("About")
		res.send(req.rootUser);
	})

//Logout
router.get("/logout",(req,res)=>
	{
		console.log("Logged Out !");
		res.clearCookie("jwtoken", { path:"/" });
		res.status(200).send("Logged Out");
	})
module.exports = router;
