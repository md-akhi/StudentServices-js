import { Project as ModelProject } from "../models/project.js";
import { User as ModelUser } from "../models/user.js";
import { templateHome as Template } from "../config/routes.cjs";

export default function (infoApp) {
	// middleware function
	//Mid(infoApp);
	// middleware function to check for logged-in users
	return {
		Root_Get: function (req, res) {
			res.render("home", {
				name: "student Services",
				title: "Student Services",
			});
		},

		Users_Get: function (req, res) {
			ModelUser.find({}, function (err, User) {
				res.render("users_list", {
					list: User,
				});
			});
		},

		User_Get: function (req, res) {
			let userId = req.params.id;
			ModelUser.findOne({ _id: userId }, function (err, User) {
				res.render("user_detail", {
					item: User,
				});
			});
		},

		Projects_Get: function (req, res) {
			ModelProject.find({}, function (err, Project) {
				res.render("projects_list", {
					list: Project,
				});
			});
		},

		Project_Get: function (req, res) {
			let projectId = req.params.id;
			ModelProject.findOne({ _id: projectId }, function (err, Project) {
				res.render("project_detail", {
					item: Project,
				});
			});
		},
	};
}
