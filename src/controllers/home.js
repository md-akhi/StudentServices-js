import React from "react";
import { renderToString } from "react-dom/server";
import { Project as ProjectModel } from "../models/project.js";
import { User as UserModel } from "../models/user.js";
import { homeTemplate as Template } from "../config/routes.js";
import HomeReact from "../views/home";
import UsersListReact from "../views/users_list";
import UserDetailReact from "../views/user_detail";
import ProjectsListReact from "../views/projects_list";
import ProjectDetailReact from "../views/project_detail";

export default function (infoApp) {
	// middleware function
	//Mid(infoApp);
	// middleware function to check for logged-in users
	return {
		Root_Get: function (req, res) {
			const RenderReact = renderToString(
				<HomeReact name="student Services" title="Student Services" />
			);
			res.render("home", {
				reactApp: RenderReact,
			});
		},

		Users_Get: function (req, res) {
			UserModel.find({}, function (err, User) {
				const RenderReact = renderToString(<UsersListReact list={User} />);
				res.render("users_list", {
					reactApp: RenderReact,
				});
			});
		},

		User_Get: function (req, res) {
			let userId = req.params.id;
			UserModel.findOne({ _id: userId }, function (err, User) {
				const RenderReact = renderToString(<UserDetailReact item={User} />);
				res.render("user_detail", {
					reactApp: RenderReact,
				});
			});
		},

		Projects_Get: function (req, res) {
			ProjectModel.find({}, function (err, Projects) {
				const RenderReact = renderToString(
					<ProjectsListReact list={Projects} />
				);
				res.render("projects_list", {
					reactApp: RenderReact,
				});
			});
		},

		Project_Get: function (req, res) {
			let projectId = req.params.id;
			ProjectModel.findOne({ _id: projectId }, function (err, Project) {
				const RenderReact = renderToString(
					<ProjectDetailReact item={Project} />
				);
				res.render("project_detail", {
					reactApp: RenderReact,
				});
			});
		},
	};
}
