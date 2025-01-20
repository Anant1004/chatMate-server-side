import mongoose from 'mongoose';


const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://picsum.photos/200'
  },
  description:{
    type: String
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
}, { timestamps: true });

const Group= mongoose.model('Group', GroupSchema);
export default Group;
