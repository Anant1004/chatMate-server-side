import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
  fullName:{
    type:String,
    required:true,
  },
  userName:{
    type:String,
    required:true,
    unique:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:12,
  },
  avatar:{
    type:String,
  },
  status:{
    type:Boolean,
    default:false,    // offline
  },
  friends:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]
},{timestamps:true});

export const User = mongoose.model("User",userSchema);