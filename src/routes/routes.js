const express = require("express");
const { defaultController } = require("../controllers/defaultController");
const {
	addMovie,
	updateMovie,
	getMovie,
	getAllMoviesInAYear,
	getAllMoviesStartingWith,
	getAllMoviesInRange,
	deleteMovie,
} = require("../controllers/movies/movies.controller");

const { movieValidation } = require("../controllers/movies/movies.validator");

const router = express.Router();

router.get("/", defaultController);

router.post("/addMovie", movieValidation, addMovie);

router.post("/updateMovie", movieValidation, updateMovie);

router.post("/getMovie", getMovie);

router.post("/getAllMoviesInYear", getAllMoviesInAYear);

router.post("/getAllMoviesStartsWith", getAllMoviesStartingWith);

router.post("/getAllMoviesInRange", getAllMoviesInRange);

router.post("/deleteMovie", deleteMovie);

module.exports = router;
