if (process.env.NODE_ENV === "production") {
    console.log("------> Production Environment <-----");
    module.exports = require("./prod");
  } else  {
    console.log("------> Development Environment <-----");
    module.exports = require("./dev");
  }