const UserModel = require("../model/UserModel");
const OTPModel = require("../model/OTPModel");
const jwt = require("jsonwebtoken");
const sentEmailUtility = require("../utility/EmailHelper");

//Registration
exports.registration = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await UserModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await UserModel.aggregate([
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]).exec();

    if (data.length > 0) {
      const Payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: data[0]["email"],
      };
      const token = jwt.sign(Payload, "SecretKey123456789");
      res.status(200).json({ status: "success", token: token, data: data[0] });
    } else {
      res.status(401).json({ status: "unauthorized" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

//update

exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    let result = await UserModel.updateOne({ email: email }, reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", message: "Profile update fail" });
  }
};

exports.profileDetails = async (req, res) => {
  try {
    const email = req.headers["email"];
    const data = await UserModel.aggregate([
      { $match: { email: email } },
      {
        $project: {
          _id: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
          password: 1,
        },
      },
    ]).exec();
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

exports.RecoverVerifyEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const OTPCode = Math.floor(100000 + Math.random() * 900000);

    // Check if the user with the provided email exists
    const userCount = await UserModel.countDocuments({ email: email });

    if (userCount > 0) {
      // Create OTP document
      await OTPModel.create({ email: email, otp: OTPCode });

      // Send email with OTP code
      const emailBody = `Your PIN Code is: ${OTPCode}`;
      const emailSubject = "Task Manager PIN Verification";
      const sendEmailResult = await sentEmailUtility(
        email,
        emailBody,
        emailSubject
      );

      res.status(200).json({ status: "success", data: sendEmailResult });
    } else {
      res.status(200).json({ status: "fail", data: "No User Found" });
    }
  } catch (error) {
    res.status(200).json({ status: "fail", data: error.message });
  }
};

exports.RecoverVerifyOTP = async (req, res) => {
  let email = req.params.email;
  let OTPCode = req.params.otp;
  let status = 0;
  let statusUpdate = 1;
  try {
    let OTPCount = await OTPModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: status } },
      { $count: "total" },
    ]);
    if (OTPCount.length > 0) {
      let OTPUpdate = await OTPModel.updateOne(
        { email: email, otp: OTPCode, status: status },
        {
          email: email,
          otp: OTPCode,
          status: statusUpdate,
        }
      );
      res.status(200).json({ status: "success", data: OTPUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid OTP Code" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

exports.RecoverResetPass = async (req, res) => {
  let email = req.body["email"];
  let OTPCode = req.body["OTP"];
  let NewPass = req.body["password"];
  let statusUpdate = 1;

  try {
    let OTPUsedCount = await OTPModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: statusUpdate } },
      { $count: "total" },
    ]);
    if (OTPUsedCount.length > 0) {
      let PassUpdate = await UserModel.updateOne(
        { email: email },
        {
          password: NewPass,
        }
      );
      res.status(200).json({ status: "success", data: PassUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid Request" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};
