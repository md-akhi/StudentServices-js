let { path } = require("../config/varStatic");
module.exports = function (infoApp) {
	// middleware function to check for logged-in users
	return {
		logInChecker: (req, res, next) => {
			if (infoApp.session.login === false && req.baseUrl !== path.CAuth()) {
				res.redirect(path.CAuth() + "/login?redirect=" + req.originalUrl);
			} else if (
				req.baseUrl == path.CAuth() &&
				infoApp.session.login === true
			) {
				res.redirect(path.CDashboard());
			}
			//  else if (infoApp.session.cookie.originalMaxAge < 0) {
			//   infoApp.session.lookscreen = 1;
			//   res.redirect("/auth/lookscreen");
			// }
			next();
		},
		sessionChecker: (req, res, next) => {
			if (req.session === undefined) {
				req.session = infoApp.session;
			}
			next();
		},
		roleChecker: (req, res, next) => {
			if (undefined);
			next();
		},
		tokenChecker: (req, res, next) => {
			if (undefined);
			next();
		},
	};
};
