const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
  res.json({
    status: httpStatusText.SUCCESS,
    data: { courses: await Course.find() },
  });
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        course: { msg: "course not found" },
      });
    }
    res.json({
      status: httpStatusText.SUCCESS,
      data: { course: course },
    });
  } catch (error) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      message: error.message,
    });
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
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { course: updatedCourse },
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      message: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { course: deletedCourse },
    });
  } catch (error) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      message: error.message,
    });
  }
};

const addCourse = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        course: { msg: errors.array() },
      });
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { course: newCourse },
    });
  } catch (error) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      message: error.message,
    });
  }
};
module.exports = {
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  addCourse,
};
