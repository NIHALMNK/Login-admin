const mongoose=require('mongoose')
const connect=require('../db/connectdb')
connect()
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }

});

module.exports=mongoose.model("Users", userSchema)//collection name