const mongoose = require('mongoose');

/**
 * Schema
 */
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  shortdescription: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  registerTime: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('Post', PostSchema);
