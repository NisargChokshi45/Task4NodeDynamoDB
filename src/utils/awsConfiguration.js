require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
});

module.exports = {
  AWS,
};
