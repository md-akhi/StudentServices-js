import React from "react";
import { renderToString } from "react-dom/server";
import { Project as ProjectModel } from "../models/project.js";
import { User as UserModel } from "../models/user.js";
import { homeTemplate as Template } from "../config/routes.cjs";
import HomeReact from "../views/home";
import UsersListReact from "../views/users_list";
import UserDetailReact from "../views/user_detail";

export default function (infoApp) {
	// middleware function
	//Mid(infoApp);
	// middleware function to check for logged-in users
	return {
		Root_Get: function (req, res) {
			const RenderReact = renderToString(<HomeReact />);
			res.render("home", {
				reactApp: RenderReact,
				name: "student Services",
				title: "Student Services",
			});
		},

		Users_Get: function (req, res) {
			UserModel.find({}, function (err, User) {
				const RenderReact = renderToString(<UsersListReact />);
				res.render("users_list", {
					reactApp: RenderReact,
					list: User,
				});
			});
		},

		User_Get: function (req, res) {
			let userId = req.params.id;
			UserModel.findOne({ _id: userId }, function (err, User) {
				const RenderReact = renderToString(<UserDetailReact />);
				res.render("user_detail", {
					reactApp: RenderReact,
					item: User,
				});
			});
		},

		Projects_Get: function (req, res) {
			ProjectModel.find({}, function (err, Project) {
				res.render("projects_list", {
					list: Project,
				});
			});
		},

		Project_Get: function (req, res) {
			let projectId = req.params.id;
			ProjectModel.findOne({ _id: projectId }, function (err, Project) {
				res.render("project_detail", {
					item: Project,
				});
			});
		},
	};
}
