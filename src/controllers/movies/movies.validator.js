const joi = require("joi");
const { errorFunction } = require("../../utils/errorFunction");

const currentYear = new Date().getFullYear();

const validation = joi.object({
	year: joi.number().max(currentYear).required(),
	title: joi.string().trim(true).required(),
	info: joi.object({
		directors: joi.array().items(joi.string().trim(true)),
		release_date: joi.date(),
		rating: joi.number().min(0).max(10),
		genres: joi.array().items(joi.string().trim(true)),
		image_url: joi.string().trim(true),
		plot: joi.string().trim(true),
		rank: joi.number().min(1),
		running_time_secs: joi.number(),
		actors: joi.array().items(joi.string().trim(true)),
	}),
});

const movieValidation = (req, res, next) => {
	const incomingData = {
		year: req.body.year,
		title: req.body.title,
		info: req.body.info,
	};

	const { error } = validation.validate(incomingData);
	if (error) {
		res.status(400);
		return res.json(errorFunction(true, error.message));
	} else {
		next();
	}
};

module.exports = {
	movieValidation,
};
