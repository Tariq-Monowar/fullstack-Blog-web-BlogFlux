const { default: mongoose } = require("mongoose");
const dev = require("./db");

const db_connection = async () => {
  try {
    await mongoose.connect(dev.db.url);
    console.log("Connect.....")
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = db_connection;
