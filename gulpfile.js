//require("dotenv").config();
// Fetch required plugins
const gulp = require("gulp");
//const { src, dest, watch, series, parallel } = require("gulp");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("cssnano");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const del = require("delete");
const infoPlugins = require("./build/npm/Plugins");

// All paths
const paths = {
	images: {
		src: ["./build/img/**/*"],
		dest: "./public/img/",
	},
	styles: {
		src: ["./build/scss/**/*.scss"],
		dest: "./public/css/",
		merge: "stylesheet",
	},
	scripts: {
		src: ["./build/js/**/*.js"],
		dest: "./public/js/",
		merge: "javascript",
	},
	plugins: {
		src: "/*",
		dest: "./public/",
	},
};

function clean(cb) {
	return del(["public/js/*.js", "public/css/*.css"], function (err, deleted) {
		if (err) throw err;
	});
}

// Optimize images(.png, .jpeg, .gif, .svg)
/**
 * Custom options
 * imagemin([
 *       imagemin.gifsicle({ interlaced: true }),
 *       imagemin.mozjpeg({ quality: 75, progressive: true }),
 *       imagemin.optipng({ optimizationLevel: 5 }),
 *       imagemin.svgo({
 *         plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
 *       })
 *     ])
 */
function images() {
	return gulp
		.src(paths.images.src)
		.pipe(imagemin().on("error", (error) => console.log(error)))
		.pipe(gulp.dest(paths.images.dest));
}

// Compile styles
/**
 * To concat styles, add below code after sourcemaps is initialized
 * .pipe(concat('{OutputFileName}.css'))
 *
 * Note - Not all plugins work with postcss, only the ones mentioned in their documentation
 */
function styles() {
	return gulp
		.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(concat(paths.styles.merge + ".css")) // So use gulp-rename to change the extension
		.pipe(rename({ extname: ".min.css" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.styles.dest));
}

// Minify scripts
/**
 * To concat scripts, add below code after sourcemaps is initialized
 * .pipe(concat('{OutputFileName}.js'))
 */
function scripts() {
	return gulp
		.src(paths.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", (error) => console.log(error)))
		.pipe(concat(paths.scripts.merge + ".js")) // So use gulp-rename to change the extension
		.pipe(rename({ extname: ".min.js" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.scripts.dest));
}

// copy plugins
function plugins() {
	infoPlugins.forEach((module) => {
		gulp
			.src(module.from + paths.plugins.src)
			.pipe(gulp.dest(paths.plugins.dest + module.to));
	});
}

// Watch for file modification at specific paths and run respective tasks accordingly
function watch() {
	gulp.watch(paths.images.src, images);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, scripts);
}

function development() {
	return gulp.series(
		clean,
		gulp.parallel(images, styles, scripts, plugins),
		watch
	);
}

function production() {
	return gulp.series(
		clean,
		gulp.parallel(images, styles, scripts, plugins),
		watch
	);
}

// Export tasks to make them public
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.plugins = plugins;
exports.watch = watch;

exports.development = development;
exports.production = production;

if (process.env.NODE_ENV === "production") {
	exports.default = production;
} else {
	exports.default = development;
}

// const webpack = require("webpack-stream");
// gulp.task("default", function () {
// 	return gulp
// 		.src("src/file.js")
// 		.pipe(
// 			webpack({
// 				// Any configuration options...
// 			})
// 		)
// 		.pipe(gulp.dest("public/"));
// });
