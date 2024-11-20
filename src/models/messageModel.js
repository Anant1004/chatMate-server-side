import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: [{
    content:{
      type:String,
      required:true,
      trim:true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sentAt:{
      type: Date,
      default:Date.now()
    },
    isSeen: {
      type: Boolean,
      default: false
    }
  }]
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);
export default Message;
