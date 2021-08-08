var mongoose = require("mongoose");

var todoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
      ref: "User",
    },
    text: {
      type: String,
    },
    date: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema);

//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
