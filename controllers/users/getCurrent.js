const mongoose = require("mongoose");
const { User } = require("../../models");
const { Transaction } = require("../../models/transaction");
const { NotFound } = require("http-errors");

const getCurrent = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new NotFound(`User with id=${userId} not found`);
  }
  const { name, balance } = await User.findById(userId);

  const result = await Transaction.find({
    owner: userId,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).send({
    status: "success",
    code: 200,
    message: `Information received`,
    data: {
      user: {
        name,
        balance,
        result,
      },
    },
  });
};

module.exports = getCurrent;
