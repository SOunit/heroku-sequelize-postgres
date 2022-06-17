const express = require("express");
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
} = require("../controllers/customer.controller");

const customerRouter = express.Router();

customerRouter.get("/", getCustomers);
customerRouter.get("/:customerId", getCustomerById);
customerRouter.post("/", createCustomer);
customerRouter.put("/:customerId", updateCustomer);

module.exports = customerRouter;
