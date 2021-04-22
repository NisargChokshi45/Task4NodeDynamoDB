const errorFunction = (errorBit, msg, result) => {
	if (errorBit) return { is_error: errorBit, message: msg };
	else return { is_error: errorBit, message: msg, data: result };
};

module.exports = {
	errorFunction,
};
