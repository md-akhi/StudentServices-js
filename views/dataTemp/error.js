let { path } = require("../../config/routes");

let er400 = {
	Home: "/",
	Frelanser: path.CFrelanser(),
	Employer: path.CEmployer(),
};

let er500 = {
	Home: "/",
	Frelanser: path.CFrelanser(),
	Employer: path.CEmployer(),
};

module.exports = {
	er400,
	er500,
};
