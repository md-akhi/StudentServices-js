import Express from "express";
import ControllerGuest from "../controllers/guest.js";

export default function () {
	let Router = Express.Router();

	Router.route("/")
		.all()
		.get((req, res) => {
			res.json({ massage: "Received a GET HTTP method" });
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

	return Router;
}
