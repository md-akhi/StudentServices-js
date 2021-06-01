var mongoose = require("mongoose");

var employerSchema = mongoose.Schema({
  userId: {
    type: String,
    index: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
  },
  tag: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

// Virtual for author "full" name.
employerSchema.virtual('name').get(function() {
  return this.fullname;
});

module.exports = mongoose.model("employer", employerSchema);
