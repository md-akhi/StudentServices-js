var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: 'ROLE_MEMBER',
    enum: ['ROLE_MEMBER', 'ROLE_ADMIN']
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  dateBirth: { type: Date },
});

// Virtual for author "full" name.
userSchema.virtual('name').get(function() {
  return this.fullname;
});

module.exports = mongoose.model("users", userSchema);

