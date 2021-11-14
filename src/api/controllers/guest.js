// import { Project as ProjectModel } from "../../models/project.js";
// import { User as UserModel } from "../../models/user.js";

export default function (infoApp) {
	return {
		Root_Get: (req, res) => {
			return res.json({ massage: "Received a GET HTTP method" });
		},
	};
}
