import {
	Project as ProjectModel,
	file as FileModel,
} from "../../models/project.js";
import Upload from "../config/upload.js";

export default {
	Root_Get: (req, res) => {
		return res.json({ massage: "Received a GET HTTP method" });
	},

	Upload_Post: [
		Upload.array("file", 3),
		(req, res, next) => {
			const { userId, ProjectId, file = null } = req.body;
			console.log(req.body, req.file, req.files);
			const files = new FileModel({
				userId: userId,
				ProjectId: ProjectId,
				files: file,
			});

			files
				.save()
				.then((result) => {
					res.status(201).json({
						message: "Done ",
						statusCode: 201,
					});
				})
				.catch((err) => {
					console.log(err),
						res.status(500).json({
							message: err,
							error: err,
							statusCode: 500,
						});
				});
		},
	],
};
