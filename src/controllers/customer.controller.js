const Customer = require("../models/customer");

exports.createCustomer = async (req, res) => {
  const { name, email } = req.body;

  const newCustomer = await Customer.create({
    name,
    email,
  });

  res.json(newCustomer);
};

exports.getCustomers = async (req, res) => {
  const customers = await Customer.findAll();
  res.json(customers);
};

exports.getCustomerById = async (req, res) => {
  const customerId = req.params.customerId;

  const customer = await Customer.findByPk(customerId);

  if (customer) {
    res.json(customer);
  } else {
    res.json({ message: `customer Not Found, customerId ${customerId}` });
  }
};

exports.updateCustomer = async (req, res) => {
  const newCustomer = req.body;
  const customerId = req.params.customerId;

  console.log("newCustomer", newCustomer);
  console.log("customerId", customerId);

  try {
    const response = await Customer.update(newCustomer, {
      where: { id: customerId },
    });

    if (response[0] === 1) {
      return res.json({ message: `updated ${customerId}` });
    }
    return res.json({ message: `update failed ${customerId}` });
  } catch (error) {
    res.json({
      message: `customer not found, customerId ${customerId}`,
    });
  }
};
