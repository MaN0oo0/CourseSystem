const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWapper = require("../middlewares/asyncWapper");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const getAllUsers = asyncWapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  //   console.log(query);

  res.json({
    status: httpStatusText.SUCCESS,
    data: {
      Users: await User.find({}, { __v: false, password: false })
        .limit(limit)
        .skip(skip),
    },
  });
});

const login = asyncWapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    let error = appError.create(
      "email and password is required ",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  let IsExsited = await User.findOne({ email: req.body.email });

  if (IsExsited == null) {
    let error = appError.create(
      "email is not found ",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const matchpwd = await bcrypt.compare(password, IsExsited.password);
  if (!matchpwd) {
    let error = appError.create(
      "password not correct ",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  } else {
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        userToken: await generateToken({
          email: IsExsited.email,
          firstName: IsExsited.firstName,
          lastName: IsExsited.lastName,
          avata: IsExsited.avatar,
          id: IsExsited.id,
          role: IsExsited.role,
        }),
      },
    });
  }
});

const register = asyncWapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  let IsExsited = await User.findOne({ email: req.body.email });

  if (IsExsited != null) {
    let error = appError.create(
      "email is alrady used ",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }

  //password hash
  const pwdHash = await bcrypt.hash(password, 10);
  //   console.log(pwdHash);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: pwdHash,
    role,
  });

  //generate JWT token

  newUser.token = await generateToken({
    email: newUser.email,
    id: newUser.id,
    role: newUser.role,
  });

  await newUser.save();
  return res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { user: newUser },
  });
});

const verifyToken = asyncWapper(async (req, res, next) => {
  if (req.headers != null) {
    try {
      let IsExsited = await User.findOne({ userToken: req.body.token });

      if (IsExsited == null) {
        let error = appError.create(
          "Token is not found ",
          404,
          httpStatusText.FAIL
        );
        return next(error);
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      const err = appError.create(
        "invalid token",
        401,
        httpStatusText.UNAUTHORIZED
      );
      return next(err);
    }
  }
});
module.exports = {
  getAllUsers,
  login,
  register,
  verifyToken,
};
