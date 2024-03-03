const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

//Registration
exports.registration = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await UserModel.create(reqBody);
    res.status(201).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", message: "Something went wrong" });
  }
};

//Login
const login = async (req, res) => {
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
          image: 1,
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

exports.login = login;
