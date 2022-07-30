const { Transaction } = require("../../models/transaction");

const getStatistics = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.query;

  const result = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        month: Number(month),
        year: Number(year),
      },
    },
    {
      $group: {
        _id: {
          category: "$category",
          isIncome: "$isIncome",
        },
        totalSum: { $sum: "$amount" },
      },
    },
  ]);

  const transactionsExpense = result.filter((el) => el._id.isIncome === false);
  const transactionsIncome = result.filter((el) => el._id.isIncome === true);
  const totalExpense = transactionsExpense.reduce(
    (acc, { totalSum }) => acc + totalSum,
    0
  );
  const totalIncome = transactionsIncome.reduce(
    (acc, { totalSum }) => acc + totalSum,
    0
  );

  res.status(201).json({
    status: "success",
    message: "Statistics received",
    code: 200,
    data: {
      result,
      totalIncome,
      totalExpense,
    },
  });
};

module.exports = getStatistics;
