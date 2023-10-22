let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourseById = (req, res) => {
  //   console.log(req.params);
  const course = courses.find(
    (cors) => cors.id === parseInt(req.params.courseId)
  );
  if (!course) {
    res.status(404).json({ msg: "course not found" });
  }
  res.json(course);

  console.log(course);
};

const updateCourse = (req, res) => {
  let course = courses.find(
    (cors) => cors.id === parseInt(req.params.courseId)
  );
  if (!course) {
    res.status(404).json({ msg: "course not found" });
  }
  course = { ...course, ...req.body };
  res.json(course);
};

const deleteCourse = (req, res) => {
  let course = courses.find(
    (cors) => cors.id === parseInt(req.params.courseId)
  );
  if (!course) {
    res.status(404).json({ msg: "course not found" });
  }
  courses = courses.filter((e) => e.id !== parseInt(req.params.courseId));
  res.json("Element Deleted");
};

const addCourse = (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    courses.push({ id: courses.length + 1, ...req.body });
    res.json(courses);
  } else {
    console.log("errors", errors);
    return res.status(400).json(errors.array());
  }
};
module.exports = {
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  addCourse,
};
