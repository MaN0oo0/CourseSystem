const express = require("express");

let router = express.Router();
let coursesController = require("../controllers/courses_Controllers");
const vallidtion = require("../middlewares/validationSchema");
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(coursesController.addCourse);

router
  .route("/:courseId")
  .get(coursesController.getCourseById)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
