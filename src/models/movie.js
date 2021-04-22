const { AWS } = require("../utils/awsConfiguration");
const fs = require("fs");
const path = require("path");

const checkMovieTable = () => {
	try {
		const dynamoDB = new AWS.DynamoDB();
		const params = {
			TableName: "Movies",
		};
		dynamoDB.describeTable(params, async (err, data) => {
			if (err) {
				if (err.code === "ResourceNotFoundException") {
					await createMovieTable();
				}
			} else {
				return;
			}
		});
	} catch (error) {
		return console.log(
			"Error Checking Table. Error JSON:",
			JSON.stringify(error, null, 2)
		);
	}
};

const createMovieTable = async () => {
	try {
		const dynamoDB = new AWS.DynamoDB();

		const params = {
			TableName: "Movies",
			KeySchema: [
				// Creating a PARTITION KEY
				{ AttributeName: "year", KeyType: "HASH" },
				// Creating a SORT KEY
				{ AttributeName: "title", KeyType: "RANGE" },
			],
			AttributeDefinitions: [
				{ AttributeName: "year", AttributeType: "N" },
				{ AttributeName: "title", AttributeType: "S" },
			],
			ProvisionedThroughput: {
				ReadCapacityUnits: 10,
				WriteCapacityUnits: 10,
			},
		};

		dynamoDB.createTable(params, async (err, data) => {
			if (err) {
				if (err.code === "ResourceInUseException") {
					return;
				} else
					return console.log(
						"Unable to Create Table. Error JSON:",
						JSON.stringify(err, null, 2)
					);
			} else {
				// console.log(
				// 	"Table Created. Table JSON:",
				// 	JSON.stringify(data, null, 2)
				// );
				console.log("Table Created");
				if (data.TableDescription.TableStatus === "ACTIVE")
					return await loadMovieTableData();
			}
		});
	} catch (error) {
		return console.log(
			"Error Creating Table. Error JSON:",
			JSON.stringify(error, null, 2)
		);
	}
};

const deleteMovieTable = () => {
	try {
		const dynamoDB = new AWS.DynamoDB();

		const params = {
			TableName: "Movies",
		};

		dynamoDB.deleteTable(params, (err, data) => {
			if (err) {
				if (err.code === "ResourceNotFoundException") {
					return console.log("Table Does not Exists");
				}
				return console.log(
					"Unable to Delete Table. Error JSON:",
					JSON.stringify(err, null, 2)
				);
			} else {
				console.log(
					"Table Deleted. Table JSON:",
					JSON.stringify(data, null, 2)
				);
			}
		});
	} catch (error) {
		return console.log(
			"Error Deleting Table. Error JSON:",
			JSON.stringify(error, null, 2)
		);
	}
};

const loadMovieTableData = async () => {
	try {
		const docClient = new AWS.DynamoDB.DocumentClient();
		const filePath = path.join(__dirname, "./../data/movieData.json");

		const allMovies = JSON.parse(fs.readFileSync(filePath, "utf8"));
		allMovies.forEach((movie) => {
			var params = {
				TableName: "Movies",
				Item: {
					year: movie.year,
					title: movie.title,
					info: movie.info,
				},
			};

			docClient.put(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to Add a Movie titled - ",
						movie.title,
						". Error JSON:",
						JSON.stringify(err, null, 2)
					);
				} else {
					console.log("Movie Added. Movie Title:", movie.title);
				}
			});
		});
	} catch (error) {
		console.log(
			"Error Loading Movies. Error JSON:",
			JSON.stringify(error, null, 2)
		);
	}
};

module.exports = { checkMovieTable, createMovieTable, deleteMovieTable };
