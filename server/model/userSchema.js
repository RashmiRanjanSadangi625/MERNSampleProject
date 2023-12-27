const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const SECRET_KEY = process.env.SECRET_KEY;
//Schema 
const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	phone :{
		type:Number,
		required:true
	},
	work:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	cpassword:{
		type:String,
		required:true
	},
	messages:[
		{
			name:{
				type:String,
				required:true
				},
			email:{
				type:String,
				required:true
			},
			phone :{
				type:Number,
				required:true
			},
			message:{
				type:String,
				required:true
			}
		}
	],
	date:{
		type:Date,
		default:Date.now
	},
	tokens: [
		{
			token :{
				type:String,
				required:true
			}
		}
		]
	 })

//use pre method to run before save
// --> Reason : before storing data we have to hash the passwords 
userSchema.pre('save', async function (next){
	console.log("Hii From Pre Method !")
	if(this.isModified('password'))
	{
		this.password = await bcrypt.hash(this.password,12);
		this.cpassword = await bcrypt.hash(this.cpassword,12);
	}
	next();
})

//Generating Auth Token
userSchema.methods.generateAuthToken = async function()
{
	try
	{
		let newToken = jwt.sign({_id :  this._id},process.env.SECRET_KEY);
		this.tokens = this.tokens.concat({token:newToken});
		await this.save();
		return newToken;
	}
	catch(err)
	{
		console.log(err);
	}
}

//Adding message field
userSchema.methods.addMessage = async function(name,email,phone,message)
{
	try
	{
		this.messages = this.messages.concat({name,email,phone,message});
		await this.save();
		return this.messages;
	}
	catch(err) 
	{
		console.log(err);
	}
}


// Add the schema with collection name
const User = mongoose.model('user',userSchema);
//Exporting as module , to use further in anywhere in the project
module.exports = User ;
