import Express from "express";
import EmployerController from "../controllers/employer.js";
import FileUpload from "express-fileupload";

export default function () {
	const Router = Express.Router();

	Router.use(FileUpload());

	Router.route("/")
		.get((req, res) => {
			return res.json({ massage: "Received a GET HTTP method" });
		})
		.post((req, res) => {
			return res.json({ massage: "Received a POST HTTP method" });
		})
		.put((req, res) => {
			return res.json({ massage: "Received a PUT HTTP method" });
		})
		.delete((req, res) => {
			return res.json({ massage: "Received a DELETE HTTP method" });
		});

	Router.route("/upload").post(EmployerController.Upload_Post);

	Router.route("/download").get(EmployerController.Download_Get);

	return Router;
}
