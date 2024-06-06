const app = require("./app");
const db_connection = require("./config/config");
const dev = require("./config/db");

const port = dev.app.port;

app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
  await db_connection();
});
