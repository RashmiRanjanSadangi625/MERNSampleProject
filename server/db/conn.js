const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB)
	.then(()=>{
			console.log("Connection Succefull !");
		}).catch((err)  => console.log("No connection"))
