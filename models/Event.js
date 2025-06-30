const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  name: String,
  date: String,
  time: String,
  location: String,
  description: String,
  attendeeCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Event', eventSchema);