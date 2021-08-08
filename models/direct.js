var mongoose = require("mongoose");

var directChatSchema = mongoose.Schema(
  {
    frelanserId: {
      type: String,
      index: true,
      ref: "User",
    },
    employerId: {
      type: String,
      index: true,
      ref: "User",
    },
    frelanserText: [
      {
        text: {
          type: String,
        },
        read: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    employerText: [
      {
        text: {
          type: String,
        },
        read: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    updatedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("directChat", directChatSchema);

//user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
