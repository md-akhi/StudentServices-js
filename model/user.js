var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

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
});

var Users = (module.exports = mongoose.model("users", userSchema));

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByEmail = function (email, callback) {
  var query = { email: email };
  Users.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
  Users.findById(id, callback);
};
module.exports.comparePassword = function (givenPassword, hash, callback) {
  bcrypt.compare(givenPassword, hash, function (err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports.getAllUsers = function (callback) {
  Users.find(callback);
};
