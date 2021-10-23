import { Project as ModelProject } from "../models/project.js";
import { User as ModelUser } from "../models/user.js";
import { templateHome as Template } from "../config/routes.cjs";

export default function (infoApp) {
	// middleware function
	//Mid(infoApp);
	// middleware function to check for logged-in users
	return {
		rootGet: function (req, res) {
			res.render("home", {
				name: "student Services",
				title: "Student Services",
			});
		},

		usersGet: function (req, res) {
			ModelUser.find({}, function (err, User) {
				res.render("users_list", {
					list: User,
				});
			});
		},

		projectsGet: function (req, res) {
			ModelProject.find({}, function (err, Project) {
				res.render("projects_list", {
					list: Project,
				});
			});
		},
	};
}
