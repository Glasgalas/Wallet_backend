const express = require("express");
const { transactions: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/transaction");
const { ctrlWrapper, validation } = require("../../middlewares");
const { auth } = require("../../middlewares");

const router = express.Router();

// нова транзакція
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));
// всі транзакції
router.get("/", auth, ctrlWrapper(ctrl.getAll));
// видалення транзакції
router.delete("/:transactionId", auth, ctrlWrapper(ctrl.remove));
// отримання категорій
router.get("/categories", ctrlWrapper(ctrl.getCategories));

module.exports = router;
