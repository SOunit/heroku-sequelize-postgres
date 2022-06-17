const express = require("express");

const sequelize = require("./util/database");
const dbSetup = require("./util/dbSetup");
const customerRouter = require("./routes/customers.routes");

const app = express();

dbSetup();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/customers", customerRouter);

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listen on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
