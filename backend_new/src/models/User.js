const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim : true,
    validate : {
      validator : (value) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re)
      },
      message : 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  listId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  progressId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Progress",
    },
  ],
  bookmarks : [
    {
      type : mongoose.Schema.Types.String,
      ref : 'Book'
    }
  ]
});

// Hash password before saving user to DB
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
