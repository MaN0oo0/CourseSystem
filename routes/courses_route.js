const express = require("express");
const { body } = require("express-validator");
let router = express.Router();
let coursesController = require("../controllers/courses_Controllers");
const authToken = require("../middlewares/authToken");
const UserRoles = require("../utils/roles");
const allowTo = require("../middlewares/allowTo");
router
  .route("/")
  .get(authToken, coursesController.getAllCourses)
  .post(
    [
      body("title")
        .notEmpty()
        .withMessage("title is required")
        .isLength({ min: 2 })
        .withMessage("must enter 2 char"),
      body("price").notEmpty().withMessage("price is required"),
    ],
    authToken,
    coursesController.addCourse
  );

router
  .route("/:courseId")
  .get(coursesController.getCourseById)
  .patch(coursesController.updateCourse)
  .delete(
    authToken,
    allowTo(UserRoles.ADMIN, UserRoles.MANAGER),
    coursesController.deleteCourse
  );

module.exports = router;
