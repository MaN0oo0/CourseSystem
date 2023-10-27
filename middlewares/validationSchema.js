const { body } = require("express-validator");

const vallidtion = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("must enter 2 char"),
    body("price").notEmpty().withMessage("price is required"),
  ];
};
module.exports = vallidtion;
