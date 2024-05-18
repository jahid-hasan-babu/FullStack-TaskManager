const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    email: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const OTPModel = mongoose.model("otps", DataSchema);

module.exports = OTPModel;
