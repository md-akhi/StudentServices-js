let { path } = require("../../config/routes");

let linkNavUp = {
	Contact: "/Contact-us",
	Frelanser: path.CFrelanser(),
	Employer: path.CEmployer(),
};

let breadCrumb = {
	Dashboard: path.CDashboard(),
};

module.exports = { linkNavUp, breadCrumb };
