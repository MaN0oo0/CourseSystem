const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
module.exports = (asyncfn) => {
  return (req, res, next) => {
    asyncfn(req, res, next).catch((err) => {
      next(err);
    });
  };
};
