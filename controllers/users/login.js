const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized(
      "Email is wrong or not verify, or password is wrong"
    );
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).send({
    status: "success",
    code: 200,
    message: `Welcome, ${user.name}!`,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
        transaction: user.transactions,
      },
    },
  });
};

module.exports = login;
