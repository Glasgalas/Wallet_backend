const categories = require("../../assets/categories");

const getCategories = async (req, res) => {
  res.status(201).json({
    status: "success",
    message: "Categories received",
    code: 200,
    data: {
      categories,
    },
  });
};

module.exports = getCategories;
