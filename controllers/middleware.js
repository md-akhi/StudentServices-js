import { pathCustomer as Path, pathHome } from "../config/routes.cjs";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		/**
		 * @param {object} req
		 * @param {object} res
		 * @param {Function} next
		 * @returns {null}}
		 */
		logInChecker: (req, res, next) => {
			if (infoApp.session.login === false && req.baseUrl !== pathHome.Auth()) {
				res.redirect(pathHome.Auth() + "/login?redirect=" + req.originalUrl);
			} else if (
				req.baseUrl == pathHome.Auth() &&
				infoApp.session.login === true
			) {
				res.redirect(Path.Dashboard());
			}
			//  else if (infoApp.session.cookie.originalMaxAge < 0) {
			//   infoApp.session.lookscreen = 1;
			//   res.redirect(pathHome.Auth()+"/lookscreen");
			// }
			next();
		},

		/**
		 * @param {object} req
		 * @param {object} res
		 * @param {Function} next
		 * @returns {null}}
		 */
		sessionChecker: (req, res, next) => {
			if (req.session === undefined) {
				req.session = infoApp.session;
			}
			next();
		},

		/**
		 * @param {object} req
		 * @param {object} res
		 * @param {Function} next
		 * @returns {null}}
		 */
		roleChecker: (req, res, next) => {
			if (undefined);
			next();
		},

		/**
		 * @param {object} req
		 * @param {object} res
		 * @param {Function} next
		 * @returns {null}}
		 */
		tokenChecker: (req, res, next) => {
			if (undefined);
			next();
		},
	};
}
