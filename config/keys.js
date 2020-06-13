require("dotenv").config();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
const getUsers = (request, response) => {
  pool.query("SELECT * FROM accounts ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    return results.rows;
  });
};

console.log(getUsers());

module.exports = {
  getUsers,
};

module.exports = {
  secretOrKey: "secret",
};
