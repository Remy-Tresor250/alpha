const mongoose = require("mongoose");

const dbConnection = () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to db"))
    .catch((error) => console.log(error));
};

module.exports = dbConnection