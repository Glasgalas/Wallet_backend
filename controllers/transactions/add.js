const { Transaction } = require("../../models/transaction");
const { User } = require("../../models");

const add = async (req, res) => {
  const { _id, balance } = req.user;
  const { amount, isIncome, date } = req.body;
  const month = date.slice(0, 2);
  const year = date.slice(6);
  let newBalance;
  isIncome
    ? (newBalance = balance + Number(amount))
    : (newBalance = balance - Number(amount));

  await User.findByIdAndUpdate(_id, { balance: newBalance });

  const result = await Transaction.create({
    ...req.body,
    month,
    year,
    balance: newBalance,
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
