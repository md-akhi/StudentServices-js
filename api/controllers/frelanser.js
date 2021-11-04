import { Project as ModelProject } from "../models/project.js";
import { User as ModelUser } from "../models/user.js";

export default function (infoApp) {
	return {
		Root_Get: (req, res) => {
			return res.json({ massage: "Received a GET HTTP method" });
		},
	};
}
