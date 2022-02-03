import Express from "express";
import FrelanserController from "../controllers/frelanser.js";

export default function () {
	const Router = Express.Router();

	Router.route("/request/:requestId")
		.get(FrelanserController().Requests_Get)
		.post(FrelanserController().Requests_Post)
		.put((req, res) => {
			return res.json({ massage: "PUT HTTP method" });
		})
		.delete((req, res) => {
			return res.json({ massage: "DELETE HTTP method" });
		})
		.patch((req, res) => {
			return res.json({ massage: "PATCH HTTP method" });
		});

	return Router;
}
