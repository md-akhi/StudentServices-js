import {
	Project as ProjectModel,
	Request as RequestModel,
} from "../../models/project.js";
// import { User as UserModel } from "../models/user.js";

export default function () {
	return {
		Requests_Get: (req, res) => {
			let requestId = req.params.requestId;
			RequestModel.findOne(
				{
					_id: requestId,
				},
				function (err, result) {
					result = result.toJSON();
					delete result._id;
					delete result.__v;
					return res.json(result);
				}
			);
		},

		Requests_Post: (req, res) => {
			let requestId = req.params.requestId;
			RequestModel.findOne(
				{
					_id: requestId,
				},
				function (err, result) {
					result = result.toJSON();
					delete result._id;
					delete result.__v;
					return res.json({ result, ...req.body });
				}
			);
		},
	};
}
