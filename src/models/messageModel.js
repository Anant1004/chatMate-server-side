import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: [{
    content:{
      type:String,
      required:true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    readBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }],
  target: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'targetModel',
    required: true
  },
  targetModel: {
    type: String,
    enum: ['User', 'Group'],
    required: true
  }, // it's a user or group chat
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);
export default Message;
