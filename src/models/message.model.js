import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
  groupId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Group"
  },
  senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  content:{
    type:String,
    required:true
  },
  references:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"References"
  },
  isSeen:{
    type:Boolean,
    default:false
  },
  isRead:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

export const Message=mongoose.model("Message",messageSchema);