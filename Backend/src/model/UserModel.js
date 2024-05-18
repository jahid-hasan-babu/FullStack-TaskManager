const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobile: { type: String, trim: true },
    password: { type: String, trim: true },
    photo: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("users", DataSchema);

module.exports = UserModel;
