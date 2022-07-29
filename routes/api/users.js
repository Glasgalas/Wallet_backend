const express = require("express");
const { users: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");
const { ctrlWrapper, validation } = require("../../middlewares");
const { auth } = require("../../middlewares");

const router = express.Router();

router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
