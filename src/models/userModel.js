import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://picsum.photos/200', 
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  activeStatus: {
    type: Boolean,
    default: false
  },
  friendRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  chats:[{
    chatWith:{      // store username 
      type: String,
      required: true
    },
    messages:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Message'
    }
  }]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User; 
