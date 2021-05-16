const { AWS } = require("../../utils/awsConfiguration");
const { errorFunction } = require("../../utils/errorFunction");

const addMovie = async (req, res, next) => {
	try {
		const docClient = new AWS.DynamoDB.DocumentClient();

		const { year, title, info } = req.body;
		const getParams = {
			TableName: "Movies",
			Key: {
				year: year,
				title: title,
			},
		};
		docClient.get(getParams, (err, data) => {
			if (err) {
				console.log(
					"Unable to Get Movie. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				res.status(400);
				return res.json(errorFunction(true, "Unable to Get Movie"));
			} else if (JSON.stringify(data) !== "{}") {
				res.status(302);
				return res.json(
					errorFunction(true, "Movie Already Exists", {})
				);
			} else {
				const params = {
					TableName: "Movies",
					Item: {
						year,
						title,
						info,
					},
				};

				docClient.put(params, (err, data) => {
					if (err) {
						console.log(
							`Unable to Add the Movie titled - ${title}. Error JSON:`,
							JSON.stringify(err, null, 2)
						);
						res.status(501);
						return res.json(
							errorFunction(true, "Unable to Add Movie")
						);
					} else {
						res.status(201);
						return res.json(
							errorFunction(false, "Movie Added", req.body)
						);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"Error Adding Movie. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Adding Movie"));
	}
};

const getMovie = async (req, res, next) => {
	try {
		const docClient = new AWS.DynamoDB.DocumentClient();
		const { year, title } = req.body;
		if (
			title === undefined ||
			year === undefined ||
			title === "" ||
			typeof year !== "number" ||
			typeof title !== "string"
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "Data required to Get Movie")
			);
		} else {
			const params = {
				TableName: "Movies",
				Key: {
					year: year,
					title: title,
				},
			};
			docClient.get(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to Get Movie. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Movie")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(404);
					return res.json(
						errorFunction(true, "Movie Not Found")
					);
				} else {
					res.status(200);
					return res.json(
						errorFunction(false, "Movie Details", data.Item)
					);
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Getting Movie. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Getting Movie"));
	}
};

const deleteMovie = async (req, res, next) => {
	try {
		const docClient = new AWS.DynamoDB.DocumentClient();
		const { year, title } = req.body;
		if (
			title === undefined ||
			year === undefined ||
			title === "" ||
			typeof year !== "number" ||
			typeof title !== "string"
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "Data required to Delete Movie")
			);
		} else {
			const params = {
				TableName: "Movies",
				Key: {
					year,
					title,
				},
			};
			docClient.get(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to get Movie. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Movie")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(404);
					return res.json(
						errorFunction(true, "Movie Not Found")
					);
				} else {
					docClient.delete(params, (err, deletedData) => {
						if (err) {
							console.log(
								"Unable to Delete Movie. Error JSON:",
								JSON.stringify(err, null, 2)
							);
							res.status(400);
							return res.json(
								errorFunction(
									true,
									"Unable to Delete Movie"
								)
							);
						} else {
							res.status(200);
							return res.json(
								errorFunction(
									false,
									"Movie Deleted",
									data.Item
								)
							);
						}
					});
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Deleting Movie. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Deleting Movie"));
	}
};

const updateMovie = async (req, res, next) => {
	try {
		const docClient = new AWS.DynamoDB.DocumentClient();
		const { year, title, info } = req.body;
		const getParams = {
			TableName: "Movies",
			Key: {
				year,
				title,
			},
		};
		docClient.get(getParams, (err, data) => {
			if (err) {
				console.log(
					"Unable to get Movie. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				res.status(400);
				return res.json(errorFunction(true, "Unable to Get Movie"));
			} else if (JSON.stringify(data) === "{}") {
				res.status(404);
				return res.json(errorFunction(true, "Movie Not Found"));
			} else {
				const params = {
					TableName: "Movies",
					Key: {
						year: year,
						title: title,
					},
					UpdateExpression:
						// "set info.directors = :d, info.rating = :r, info.actors = :a",
						"set info = :i",
					ExpressionAttributeValues: {
						// ":d": info.directors,
						// ":r": info.rating,
						// ":a": info.actors,
						":i": info,
					},
					ReturnValues: "UPDATED_NEW",
				};
				docClient.update(params, (err, data) => {
					if (err) {
						// console.log(
						// 	"Unable to Update Movie. Error JSON:",
						// 	JSON.stringify(err, null, 2)
						// );
						res.status(400);
						return res.json(
							errorFunction(
								true,
								"Error Updating Movie",
								JSON.stringify(err, null, 2)
							)
						);
					} else {
						res.status(200);
						return res.json(
							errorFunction(
								false,
								"Movie Updated",
								req.body
							)
						);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"Error Updating Movie. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Updating Movie"));
	}
};

const getAllMoviesInAYear = async (req, res, next) => {
	try {
		const docClient = new AWS.DynamoDB.DocumentClient();
		const { year } = req.body;
		if (year === undefined || typeof year !== "number") {
			res.status(406);
			return res.json(
				errorFunction(true, "Data required to Get All the Movies")
			);
		} else {
			const params = {
				TableName: "Movies",
				KeyConditionExpression: "#y= :y",
				ExpressionAttributeNames: {
					"#y": "year",
				},
				ExpressionAttributeValues: {
					":y": year,
				},
			};
			docClient.query(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to Get the Movies. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Movies")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(200);
					return res.json(
						errorFunction(true, "Movies Not Found")
					);
				} else {
					res.status(200);
					return res.json(
						errorFunction(false, "Movie Details", data.Items)
					);
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Getting Movie. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Getting Movie"));
	}
};

const getAllMoviesStartingWith = async (req, res, next) => {
	try {
		const docClient = new AWS.DynamoDB.DocumentClient();
		const { year, startsWith } = req.body;
		if (
			startsWith === undefined ||
			startsWith === "" ||
			typeof startsWith !== "string" ||
			year === undefined ||
			typeof year !== "number"
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "Data required to Get All the Movies")
			);
		} else {
			const params = {
				TableName: "Movies",
				ProjectionExpression: "#y, title, info.actors, info.rating",
				KeyConditionExpression: "#y= :y and begins_with(title, :s)",
				ExpressionAttributeNames: {
					"#y": "year",
				},
				ExpressionAttributeValues: {
					":y": year,
					":s": startsWith,
				},
			};
			docClient.query(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to Get the Movies. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Movies")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(200);
					return res.json(
						errorFunction(true, "Movies Not Found")
					);
				} else {
					res.status(200);
					return res.json(
						errorFunction(false, "Movie Details", data.Items)
					);
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Getting Movie. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Getting Movie"));
	}
};

const getAllMoviesInRange = async (req, res, next) => {
	try {
		const docClient = new AWS.DynamoDB.DocumentClient();
		const { startingYear, endingYear } = req.body;
		if (
			startingYear === undefined ||
			typeof startingYear !== "number" ||
			endingYear === undefined ||
			typeof endingYear !== "number"
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "Data required to Get All the Movies")
			);
		} else {
			const params = {
				TableName: "Movies",
				ProjectionExpression: "#y, title, info.rating",
				FilterExpression: "#y between :sy and :ey",
				ExpressionAttributeNames: {
					"#y": "year",
				},
				ExpressionAttributeValues: {
					":sy": startingYear,
					":ey": endingYear,
				},
			};
			docClient.scan(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to Get the Movies. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Movies")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(200);
					return res.json(
						errorFunction(true, "Movies Not Found")
					);
				} else {
					res.status(200);
					return res.json(
						errorFunction(false, "Movie Details", data.Items)
					);
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Getting Movie. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Getting Movie"));
	}
};

module.exports = {
	addMovie,
	updateMovie,
	getMovie,
	getAllMoviesInAYear,
	getAllMoviesStartingWith,
	getAllMoviesInRange,
	deleteMovie,
};
