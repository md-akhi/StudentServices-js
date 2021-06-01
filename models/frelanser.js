var mongoose = require("mongoose");

var frelanserSchema = mongoose.Schema({
  userId: {
    type: String,
    index: true,
  },
  name: {
    type: String,
  },
  text: {
    type: String,
  },
  price: {
    type: Number,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

// Virtual for author "full" name.
frelanserSchema.virtual('name').get(function() {
  return this.fullname;
});

module.exports = mongoose.model("frelanser", frelanserSchema);

