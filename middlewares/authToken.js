const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const auth = (req, res, next) => {
  const authMatch =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authMatch) {
    const err = appError.create(
      "Token is required",
      401,
      httpStatusText.UNAUTHORIZED
    );
    return next(err);
  }
  const token = authMatch.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = decodedToken;

    next();
  } catch (error) {
    const err = appError.create(
      "invalid token",
      401,
      httpStatusText.UNAUTHORIZED
    );
    return next(err);
  }
};

module.exports = auth;
