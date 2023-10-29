const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWapper = require("../middlewares/asyncWapper");

const appError = require("../utils/appError");

const getAllCourses = async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  console.log(query);

  res.json({
    status: httpStatusText.SUCCESS,
    data: {
      courses: await Course.find({}, { __v: false }).limit(limit).skip(skip),
    },
  });
};

const getCourseById = asyncWapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    const error = appError.create("Not Found Course", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({
    status: httpStatusText.SUCCESS,
    data: { course: course },
  });
});

const updateCourse = asyncWapper(async (req, res) => {
  const courseId = req.params.courseId;

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
});

const deleteCourse = asyncWapper(async (req, res) => {
  const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { course: deletedCourse },
  });
});

const addCourse = asyncWapper(async (req, res, next) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { course: newCourse },
  });
});
module.exports = {
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  addCourse,
};
