const { DocumentClient } = require("aws-sdk/clients/dynamodb");
require("dotenv").config();

const config = {
  convertEmptyValues: true,
  endpoint: process.env.ENDPOINT,
  sslEnabled: false,
  region: process.env.REGION,
};

const ddb = new DocumentClient(config);

module.exports = ddb;
