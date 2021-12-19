import {
	Project as ProjectModel,
	File as FileModel,
} from "../../models/project.js";
import Path from "path";
import Fs from "fs";
import { v5 as UID5, v4 as UID4 } from "uuid";

export default {
	Root_Get: (req, res) => {
		res.setHeader("content-type", "application/json");
		res.json({ massage: "Received a GET HTTP method" });
	},

	Upload_Post: (req, res, next) => {
		const { userId = null, projectId = null } = req.body;
		const pathFiles = Path.resolve(
			__dirname,
			"../../public/files/" + projectId
		);
		var files = [];
		if (!req.files || Object.keys(req.files).length === 0) {
			res.setHeader("content-type", "application/json");
			res.status(400).send({
				message: "No files were uploaded.",
				statusCode: 400,
			});
		}
		// check if directory exists
		if (!Fs.existsSync(pathFiles)) {
			Fs.mkdirSync(pathFiles, { recursive: true });
		}
		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		for (const [key, value] of Object.entries(req.files)) {
			// Use the mv() method to place the file somewhere on your server
			const newName = UID4();
			files.push({
				userId: userId,
				base: value.name,
				name: newName,
				mimetype: value.mimetype,
				md5: value.md5,
			});

			value.mv(Path.join(pathFiles, newName), (err) => {
				if (err) {
					res.setHeader("content-type", "application/json");
					res.status(500).send({
						error: err,
						statusCode: 500,
					});
				}
			});
			const filesDB = new FileModel({
				projectId: projectId,
				files: files,
			});

			filesDB
				.save(filesDB)
				.then((result) => {
					res.setHeader("content-type", "application/json");
					res.status(200).json({
						message: "Done ",
						statusCode: 200,
					});
				})
				.catch((err) => {
					console.error(err);
					res.setHeader("content-type", "application/json");
					res.status(500).json({
						error: err,
						statusCode: 500,
					});
				});
		}
	},

	Download_Get: (req, res) => {
		FileModel.findOne({
			_id: invoiceId,
		}).then(function (fileObj) {
			const fileName = Path.parse(fileObj.files.base);
			const filePath = Path.resolve(
				__dirname,
				"../../public/files/" + fileObj.projectId,
				fileName._id + fileName.ext
			);
			// if the file exists
			Fs.access(filePath, Fs.constants.F_OK, (err) => {
				if (err) console.error("File does not exist");
				res.download(filePath); // Set disposition and send it.
			}).catch(function (err) {
				if (err) console.error(err);
			});
		});
	},
};
