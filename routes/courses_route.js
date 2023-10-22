const express = require("express");
const { body } = require("express-validator");
let router = express.Router();
let coursesController = require("../controllers/courses_Controllers");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("must enter 2 char"),
    body("price").notEmpty().withMessage("price is required"),
    coursesController.addCourse
  );

router
  .route("/:courseId")
  .get(coursesController.getCourseById)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
