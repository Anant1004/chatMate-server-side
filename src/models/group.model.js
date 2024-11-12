import mongoose from "mongoose";

const  groupSchema=new mongoose.Schema({
  isGroup:{
    type:Boolean,
    default:false
  },
  members:[{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }],
  groupName:{
    type:String,
  },
  groupAvatar:{
    type:String,
  }
},{timestamps:true});

export const Group=mongoose.model("Group",groupSchema);