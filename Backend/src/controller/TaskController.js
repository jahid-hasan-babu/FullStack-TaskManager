const TaskModel = require("../model/TaskModel");

exports.createTask = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.email = req.headers["email"];
    let data = await TaskModel.create(reqBody);
    res.status(201).json({ status: "success", data: data });
  } catch (e) {
    res.status(400).json({ status: "fail", message: "Task create fail" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    let Query = { _id: id };
    let result = await TaskModel.deleteOne(Query);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ status: "fail", message: "Task delete fail" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    let id = req.params.id;
    let status = req.params.status;
    let Query = { _id: id };
    let reqBody = { status: status };
    let result = await TaskModel.updateOne(Query, reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ status: "fail", message: "Task update fail" });
  }
};

exports.listTaskByStatus = async (req, res) => {
  try {
    let status = req.params.status;
    let email = req.headers["email"];

    let data = await TaskModel.aggregate([
      { $match: { status: status, email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdAt: {
            $dateToString: {
              date: "$createdAt",
              format: "%d-%m-%Y",
            },
          },
          updatedAt: {
            $dateToString: {
              date: "$updatedAt",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ]).exec();

    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: "no data found" });
  }
};

exports.taskStatusCount = async (req, res) => {
  try {
    let email = req.headers["email"];
    let result = await TaskModel.aggregate([
      { $match: { email: email } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ]);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "Task not found" });
  }
};
