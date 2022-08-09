const { Transaction } = require("../../models/transaction");
const { User } = require("../../models");
const categories = require("../../assets/categories");

const add = async (req, res) => {
  const { _id, balance } = req.user;
  const { amount, isIncome, date, categoryId } = req.body;
  const month = date.slice(3, 5);
  const year = date.slice(6);
  let newBalance;
  isIncome
    ? (newBalance = balance + Number(amount))
    : (newBalance = balance - Number(amount));

  const getColor = (categoryId) => {
    let color;
    categories.expense.map((el) => {
      if (el.id === categoryId) {
        color = el.backgroundColor;
      }
    });
    return color;
  };

  const colorCategory = getColor(categoryId);

  await User.findByIdAndUpdate(_id, { balance: newBalance.toFixed(2) });

  const result = await Transaction.create({
    ...req.body,
    month,
    year,
    colorCategory,
    balance: newBalance.toFixed(2),
    owner: _id,
  });

  res.status(201).json({
    status: "success",
    message: "Transaction added",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
