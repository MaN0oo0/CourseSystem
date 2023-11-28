const express = require("express");
const { body } = require("express-validator");
let router = express.Router();
let usersController = require("../controllers/usersController");
const authToken = require("../middlewares/authToken");

const multer = require("multer");
const diskstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];

    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: diskstorage });
/**
 *  [
      body("firstName")
        .notEmpty()
        .withMessage("firstName is required")
        .isLength({ min: 3 })
        .withMessage("must enter 3 char"),
      body("lastName")
        .notEmpty()
        .withMessage("lastName is required")
        .isLength({ min: 3 })
        .withMessage("must enter 3 char"),
      body("email").notEmpty().withMessage("email is required"),
      body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("must enter 8 char"),
    ],
 */

//routes
router.route("/").get(authToken, usersController.getAllUsers);
router.route("/").get(authToken);
router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);
router.route("/login").post(usersController.login);
// router.route("/verifyToken").get(authToken);

module.exports = router;
