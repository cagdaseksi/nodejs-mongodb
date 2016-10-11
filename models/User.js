const mongoose = require('mongoose');

/**
 * Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  registerTime: {
    type: Date,
    required: true,
    default: Date.now()
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);
