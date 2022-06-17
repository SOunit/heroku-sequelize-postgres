const express = require("express");
const Company = require("./company.model");

// How do I use Sequelize to connect to Heroku Postgres?
// https://help.heroku.com/QD1AIH8R/how-do-i-use-sequelize-to-connect-to-heroku-postgres
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/companies", async (req, res) => {
  const companyModel = new Company();

  const companies = await companyModel.getCompanies();
  console.log(companies);

  res.json(companies);
});

app.get("/companies/:companyId", async (req, res) => {
  const companyId = req.params.companyId;

  const companyModel = new Company();

  const company = await companyModel.getCompanyById(companyId);

  if (company) {
    res.json(company);
  } else {
    res.json({ message: `company Not Found, companyId ${companyId}` });
  }
});

app.post("/companies", async (req, res) => {
  const company = req.body;

  const companyModel = new Company();

  const response = await companyModel.createCompany(company);

  res.json(response);
});

app.put("/companies/:companyId", async (req, res) => {
  const newCompany = req.body;
  const companyId = req.params.companyId;

  console.log("newCompany", newCompany);
  console.log("companyId", companyId);

  const companyModel = new Company();
  const response = await companyModel.updateCompany(companyId, newCompany);

  console.log("response", response);

  if (response) {
    return res.json(response);
  } else {
    return res.json({ message: `company not found, companyId ${companyId}` });
  }
});

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listen on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
