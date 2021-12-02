import { customerPath as Path, homePath } from "../routes/routes.js";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		/**
		 * @param {object} req request
		 * @param {object} res response
		 * @param {Function} next next
		 * @returns {null} null
		 */
		LogInChecker: (req, res, next) => {
			if (infoApp.user.login === false) {
				if (req.baseUrl !== homePath.Auth()) {
					res.redirect(homePath.Auth() + "/login?redirect=" + req.originalUrl);
				}
			} else if (infoApp.user.login === true) {
				if (req.baseUrl == homePath.Auth()) {
					res.redirect(Path.Dashboard());
				}
			}
			//  else if (infoApp.session.cookie.originalMaxAge < 0) {
			//   infoApp.session.lookscreen = 1;
			//   res.redirect(homePath.Auth()+"/lookscreen");
			// }
			next();
		},

		/**
		 * @param {object} req request
		 * @param {object} res response
		 * @param {Function} next next
		 * @returns {null} null
		 */
		SessionChecker: (req, res, next) => {
			if (infoApp.session == undefined) {
			}
			next();
		},

		/**
		 * @param {object} req request
		 * @param {object} res response
		 * @param {Function} next next
		 * @returns {null} null
		 */
		RoleChecker: (req, res, next) => {
			if (undefined);
			next();
		},

		/**
		 * @param {object} req request
		 * @param {object} res response
		 * @param {Function} next next
		 * @returns {null} null
		 */
		TokenChecker: (req, res, next) => {
			if (undefined);
			next();
		},
	};
}
