const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetCode: Number,
  phone: Number,
  isActive: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

module.exports = User = model('user', UserSchema);
