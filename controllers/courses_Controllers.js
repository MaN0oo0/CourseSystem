const { validationResult } = require("express-validator");
// let { courses } = require("../data/courses");
const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  console.log(await Course.find());
  res.json(await Course.find());
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      res.status(404).json({ msg: "course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ msg: "Id not Valid" });
  }
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      {
        $set: { ...req.body },
      }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(400).json({ msg: "Not Updated" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
    res.status(200).json(deletedCourse);
  } catch (error) {
    res.status(400).json({ msg: "course not found Or We have Error" });
  }
};

const addCourse = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};
module.exports = {
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  addCourse,
};
