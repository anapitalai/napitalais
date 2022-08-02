// Resources definitions
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  email: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  role: { type: String, enum: ["admin", "restricted"], required: true },
});
const User = mongoose.model("User", UserScheme);

module.exports = User;







