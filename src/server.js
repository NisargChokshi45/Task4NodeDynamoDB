require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const http = require("http");
const routes = require("./routes/routes");
const { checkMovieTable, deleteMovieTable } = require("./models/movie");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const server = http.createServer(app);

server.listen(port, () => {
	try {
		console.log(`Server Started on Port ${port}`);
		checkMovieTable();
		// deleteMovieTable();
		app.use("/", routes);
	} catch (error) {
		console.log("Error Occured while running Server : ", error);
	}
});
