const path = require("path");
const root = path.join(__dirname, "../");

require("dotenv").config({
  path: `${root}/.env`,
});

require("../src/db/db-connection").initializeDatabase();
require("../src/db/seeds");

const app = require(`${root}/app`);

const port = process.env.PORT || 9000;

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
});

process.on("unhandledRejection", (reason) => {
  console.log(`Unhandled rejection: reason: ${reason}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});