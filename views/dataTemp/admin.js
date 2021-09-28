let { path } = require("../../config/routes");

let menuNavUP = {
	Home: "/",
	Frelanser: path.CFrelanser(),
	Employer: path.CEmployer(),
};

module.exports = {
	menuNavUP,
};
