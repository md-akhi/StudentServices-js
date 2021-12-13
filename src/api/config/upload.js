import Multer from "multer";
import { v5 as UID5, v4 as UID4 } from "uuid";

export default Multer({
	storage: Multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "./public/file");
		},
		filename: (req, file, cb) => {
			//const fileName = file.originalname.toLowerCase().split(" ").join("-");
			cb(null, UID4);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
		}
	},
});
