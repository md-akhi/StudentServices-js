import Express from "express";
import EmployerController from "../controllers/employer.js";
export default function () {
	const Router = Express.Router();

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

	Router.route("/upload/:ProjectId")
		.post(EmployerController.Upload_Post)
		.put((req, res) => {
			return res.json({ massage: "Received a PUT HTTP method" });
		})
		.delete((req, res) => {
			return res.json({ massage: "Received a DELETE HTTP method" });
		});

	return Router;
}
