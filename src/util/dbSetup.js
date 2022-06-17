const Customer = require("../models/customer");
const Order = require("../models/order");

const dbSetup = () => {
  Customer.hasMany(Order);
};

module.exports = dbSetup;
