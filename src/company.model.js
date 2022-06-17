const client = require("./databasepg");

class Company {
  async createCompany(newCompany) {
    try {
      const { name, age, address, salary, join_date } = newCompany;

      const query = `INSERT INTO
                          COMPANY (ID, NAME, AGE, ADDRESS, SALARY, JOIN_DATE)
                      VALUES
                          ($1, $2, $3, $4, $5, $6);`;
      const companyId = Math.floor(Math.random(1000) * 1000);
      const values = [companyId, name, age, address, salary, join_date];

      const response = await client.query(query, values);

      console.log("createCompany response", response);

      return {
        id: companyId,
        name,
        age,
        address,
        salary,
        join_date,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCompanyById(companyId) {
    // https://node-postgres.com/features/queries
    try {
      const query = `SELECT * FROM company where id = $1`;
      const values = [companyId];

      const response = await client.query(query, values);

      return response.rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getCompanies() {
    try {
      const response = await client.query("SELECT * FROM company;");

      const companies = [];

      for (let row of response.rows) {
        companies.push(row);
      }

      console.log(companies);
      return companies;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCompany(companyId, newCompany) {
    const { name, age, address, salary, join_date } = newCompany;

    try {
      const query = `UPDATE
                        COMPANY
                    SET
                        name = $1,
                        age = $2,
                        address = $3,
                        SALARY = $4,
                        join_date = $5
                    WHERE
                        ID = $6;
                    `;
      const values = [name, age, address, salary, join_date, companyId];
      console.log("values", values);

      await client.query(query, values);

      return { id: companyId, ...newCompany };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Company;
