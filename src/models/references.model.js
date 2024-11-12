import mongoose from "mongoose";

const referencesSchema = new mongoose.Schema({
  messageId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message"
  },
  fileUrl:{
    type:String
  }
},{timestamps:true});

export const References=mongoose.model("References",referencesSchema);