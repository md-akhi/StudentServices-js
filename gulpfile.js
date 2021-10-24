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

// gulpfile.js
// Load plugins
var gulp = require("gulp"),
	sass = require("gulp-ruby-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	minifycss = require("gulp-minify-css"),
	jshint = require("gulp-jshint"),
	uglify = require("gulp-uglify"),
	imagemin = require("gulp-imagemin"),
	rename = require("gulp-rename"),
	clean = require("gulp-clean"),
	concat = require("gulp-concat"),
	notify = require("gulp-notify"),
	cache = require("gulp-cache"),
	livereload = require("gulp-livereload"),
	lr = require("tiny-lr"),
	server = lr();

// Styles
gulp.task("styles", function () {
	return gulp
		.src("src/styles/main.scss")
		.pipe(sass({ style: "expanded" }))
		.pipe(
			autoprefixer(
				"last 2 version",
				"safari 5",
				"ie 8",
				"ie 9",
				"opera 12.1",
				"ios 6",
				"android 4"
			)
		)
		.pipe(gulp.dest("dist/styles"))
		.pipe(rename({ suffix: ".min" }))
		.pipe(minifycss())
		.pipe(livereload(server))
		.pipe(gulp.dest("dist/styles"))
		.pipe(notify({ message: "Styles task complete" }));
});

// Scripts
gulp.task("scripts", function () {
	return gulp
		.src("src/scripts/**/*.js")
		.pipe(jshint(".jshintrc"))
		.pipe(jshint.reporter("default"))
		.pipe(concat("main.js"))
		.pipe(gulp.dest("dist/scripts"))
		.pipe(rename({ suffix: ".min" }))
		.pipe(uglify())
		.pipe(livereload(server))
		.pipe(gulp.dest("dist/scripts"))
		.pipe(notify({ message: "Scripts task complete" }));
});

// Images
gulp.task("images", function () {
	return gulp
		.src("src/images/**/*")
		.pipe(
			cache(
				imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
			)
		)
		.pipe(livereload(server))
		.pipe(gulp.dest("dist/images"))
		.pipe(notify({ message: "Images task complete" }));
});

// Clean
gulp.task("clean", function () {
	return gulp
		.src(["dist/styles", "dist/scripts", "dist/images"], { read: false })
		.pipe(clean());
});

// Default task
gulp.task("default", ["clean"], function () {
	gulp.start("styles", "scripts", "images");
});

// Watch
gulp.task("watch", function () {
	// Listen on port 35729
	server.listen(35729, function (err) {
		if (err) {
			return console.log(err);
		}

		// Watch .scss files
		gulp.watch("src/styles/**/*.scss", ["styles"]);

		// Watch .js files
		gulp.watch("src/scripts/**/*.js", ["scripts"]);

		// Watch image files
		gulp.watch("src/images/**/*", ["images"]);
	});
});

// <!-- livereload -->
var lr = require("tiny-lr")();

function notify(lr, root) {
	return function (event) {
		var fname = require("path").relative(root, event.path);
		lr.changed({ body: { files: [fname] } });
	};
}

gulp.task("livereload", function () {
	lr.listen(35729);
	gulp.watch("public/**/*", notify(lr, __dirname + "/public"));
});

// Express
app.use(require("connect-livereload")());
//<script>document.write('<script src="'+(location.protocol||'http:')+'//'+(location.hostname||'localhost')+':35729/livereload.js?snipver=1"><\/scr'+'ipt>')</script>
