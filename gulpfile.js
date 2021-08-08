const gulp = require("gulp");
const webpack = require("webpack-stream");
gulp.task("default", function () {
	return gulp
		.src("src/file.js")
		.pipe(
			webpack({
				// Any configuration options...
			})
		)
		.pipe(gulp.dest("public/"));
});
