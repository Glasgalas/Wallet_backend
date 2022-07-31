const { Transaction } = require("../../models/transaction");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const result = await Transaction.find({ owner: _id });

  res.status(200).json({
    status: "success",
    message: "Transactions received",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
