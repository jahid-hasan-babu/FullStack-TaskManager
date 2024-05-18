const express = require("express");
const router = express.Router();
const AuthVerification = require("../middleware/AuthVerificationMiddleware");
const UserController = require("../controller/UserController");
const TaskController = require("../controller/TaskController");

//user
router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/profileUpdate", AuthVerification, UserController.profileUpdate);
router.get("/profileDetails", AuthVerification, UserController.profileDetails);

//recover
router.get("/RecoverVerifyEmail/:email", UserController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", UserController.RecoverVerifyOTP);
router.post("/RecoverResetPass", UserController.RecoverResetPass);

//task
router.post("/createTask", AuthVerification, TaskController.createTask);
router.delete("/deleteTask/:id", AuthVerification, TaskController.deleteTask);
router.get(
  "/taskStatusCount",
  AuthVerification,
  TaskController.taskStatusCount
);

router.get(
  "/listTaskByStatus/:status",
  AuthVerification,
  TaskController.listTaskByStatus
);

router.get(
  "/updateTaskStatus/:id/:status",
  AuthVerification,
  TaskController.updateTask
);

module.exports = router;
