const { errorFunction } = require("../utils/errorFunction");

const defaultController = async (req, res, next) => {
  res.status(200);
  return res.json(errorFunction(false, "Welcome to AWS DynamoDB", "DynamoDB"));
};

module.exports = { defaultController };
