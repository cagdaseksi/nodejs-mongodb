const mongoose = require('mongoose');

/**
 * Schema
 */
 const LeagueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  slug: {
    type: String,
    required: false,
    unique: true
  },
  registerTime: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('League', LeagueSchema);
