const express = require("express");
const { users: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");
const { ctrlWrapper, validation } = require("../../middlewares");

const router = express.Router();

router.get("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));

module.exports = router;
