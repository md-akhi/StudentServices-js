import express from "express";
import ControllerFrelanser from "../controllers/frelanser.js";

export default function () {
	let router = express.Router();

	router
		.route("/")
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

	return router;
}
