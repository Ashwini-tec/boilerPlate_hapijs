const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String , required: true },
  userType: { type : String , default: 'user' , enum: [ 'user' , 'admin' ]},
  password: { type: String , required: true},
  gender: { type: String, required: true ,enum:['male','female','other']},
  age: { type: Number, required: true },
  image: { type: String, required: true }
});

const User = mongoose.model('user', userSchema);

module.exports = User;