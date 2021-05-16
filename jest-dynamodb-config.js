module.exports = {
  tables: [
    {
      TableName: "Movies",
      KeySchema: [
        {
          AttributeName: "year",
          KeyType: "HASH",
        },
        {
          AttributeName: "title",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "year",
          AttributeType: "N",
        },
        {
          AttributeName: "title",
          AttributeType: "S",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    },
  ],
};
