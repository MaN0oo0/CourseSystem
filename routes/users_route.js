const express = require("express");
const { body } = require("express-validator");
let router = express.Router();
let usersController = require("../controllers/usersController");
const authToken = require("../middlewares/authToken");
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
router.route("/register").post(usersController.register);
router.route("/login").post(usersController.login);

module.exports = router;
