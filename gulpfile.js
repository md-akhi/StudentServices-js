// Fetch required plugins
const { src, dest, series, parallel } = require("gulp"),
	//imagemin = require("gulp-imagemin"),
	sourcemaps = require("gulp-sourcemaps"),
	concat = require("gulp-concat"),
	sass = require("gulp-sass")(require("sass")),
	autoprefixer = require("gulp-autoprefixer"),
	cssnano = require("gulp-cssnano"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	cache = require("gulp-cache"),
	clean = require("gulp-clean"),
	babel = require("gulp-babel"),
	rollup = require("gulp-rollup"),
	babelRU = require("rollup-plugin-babel"),
	infoPlugins = require("./build/gulp/Plugins");

//sass(require("sass"));

// All paths
const paths = {
	// images: {
	// 	src: ["./src/views/data/img/*"],
	// 	dest: "./src/public/img/",
	// },
	styles: {
		src: ["./src/views/data/scss/all.scss"],
		dest: "./src/public/css/",
		merge: "stylesheet",
	},
	scripts: {
		src: ["./src/views/data/js/*.js"],
		dest: "./src/public/js/",
		merge: "javascript",
	},
	plugins: {
		src: "/*",
		dest: "./src/public/plugins/",
	},
};

//Optimize images(.png, .jpeg, .gif, .svg)
// const imagesTask = () => {
// 	return gulp
// 		.src(paths.images.src)
// 		.pipe(
// 			cache(
// 				imagemin([
// 					imagemin.gifsicle({ interlaced: true }),
// 					imagemin.mozjpeg({ quality: 75, progressive: true }),
// 					imagemin.optipng({ optimizationLevel: 3 }),
// 					imagemin.svgo({
// 						plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
// 					}),
// 				])
// 			).on("error", (error) => console.log(error))
// 		)
// 		.pipe(dest(paths.images.dest));
// 	//.pipe(notify({ message: "Images task complete" }));
// };

// Compile styles
/**
 * To concat styles, add below code after sourcemaps is initialized
 * .pipe(concat('{OutputFileName}.css'))
 *
 * Note - Not all plugins work with postcss, only the ones mentioned in their documentation
 */
const stylesTask = () => {
	return src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				style: "expanded",
			}).on("error", sass.logError)
		)
		.pipe(concat(paths.styles.merge + ".css")) // So use gulp-rename to change the extension
		.pipe(autoprefixer())
		.pipe(dest(paths.styles.dest))
		.pipe(cssnano())
		.pipe(rename({ extname: ".min.css" }))
		.pipe(sourcemaps.write("."))
		.pipe(dest(paths.styles.dest));
	//.pipe(notify({ message: "Styles task complete" }));
};

// Minify scripts
/**
 * To concat scripts, add below code after sourcemaps is initialized
 * .pipe(concat('{OutputFileName}.js'))
 */
const scriptsTask = () => {
	const pkg = require("./package");
	const year = new Date().getFullYear();
	return (
		src(paths.scripts.src)
			.pipe(sourcemaps.init())
			.pipe(
				rollup({
					// any option supported by Rollup can be set here.
					input: "./src/views/data/js/AdminLTE.js",
					output: {
						format: "umd",
						name: paths.scripts.merge,
						banner: `/*!
	* MD AKHI v${pkg.version} (${pkg.homepage})
	* Copyright 2021-${year} ${pkg.authors[0].name} (${pkg.authors[0].url})
	* Licensed  ${pkg.license.type}(${pkg.license.url})
	*/`,
						jquery: "jQuery",
					},
					plugins: [
						babelRU({
							presets: ["@babel/preset-env"],
							//exclude: "node_modules/**",
							externalHelpers: true,
						}),
					],
				})
			)
			// .pipe(
			// 	babel({
			// 		presets: ["@babel/preset-env"],
			// 	})
			// )
			//.pipe(concat(paths.scripts.merge + ".js")) // So use gulp-rename to change the extension
			.pipe(rename({ basename: paths.scripts.merge, extname: ".js" }))
			.pipe(dest(paths.scripts.dest))
			.pipe(uglify().on("error", (error) => console.log(error)))
			.pipe(rename({ extname: ".min.js" }))
			.pipe(sourcemaps.write("."))
			.pipe(dest(paths.scripts.dest))
	);
	//.pipe(notify({ message: "Scripts task complete" }));
};

// copy plugins
const pluginsTask = () => {
	return infoPlugins.forEach((module) => {
		src(module.from + paths.plugins.src, { allowEmpty: true }).pipe(
			dest(paths.plugins.dest + module.to)
		);
		//.pipe(notify({ message: "Plugins task complete" }));
	});
};

// Clean
const cleanTask = () => {
	return src("src/public", { allowEmpty: true, read: false }).pipe(clean());
	//.pipe(notify({ message: "Clean task complete" }));
};

const developmentTask = () => {
	return series(cleanTask, stylesTask, scriptsTask, pluginsTask);
};

// const productionTask = () => {
// 	return series(cleanTask, stylesTask, scriptsTask, pluginsTask, imagesTask);
// };

//if (process.env.NODE_ENV === "development") {
// Default task
exports.default = developmentTask();
// } else {
// 	// Default task
// 	exports.default = productionTask();
// }

// const webpack = require("webpack-stream");
// task("default", function () {
// 	return gulp
// 		.src("src/file.js")
// 		.pipe(
// 			webpack({
// 				// Any configuration options...
// 			})
// 		)
// 		.pipe(dest("public/"));
// });

// gulpfile.js
// Load plugins
// let minifycss = require("gulp-minify-css"),
// 	jshint = require("gulp-jshint");
// // Styles
// task("styles", function () {
// 	return gulp
// 		.src("src/styles/main.scss")
// 		.pipe(sass({ style: "expanded" }))
// 		.pipe(
// 			autoprefixer(
// 				"last 2 version",
// 				"safari 5",
// 				"ie 8",
// 				"ie 9",
// 				"opera 12.1",
// 				"ios 6",
// 				"android 4"
// 			)
// 		)
// 		.pipe(dest("dist/styles"))
// 		.pipe(rename({ suffix: ".min" }))
// 		.pipe(minifycss())
// 		.pipe(dest("dist/styles"))
// 		.pipe(notify({ message: "Styles task complete" }));
// });

// // Scripts
// task("scripts", function () {
// 	return gulp
// 		.src("src/scripts/**/*.js")
// 		.pipe(jshint(".jshintrc"))
// 		.pipe(jshint.reporter("default"))
// 		.pipe(concat("main.js"))
// 		.pipe(dest("dist/scripts"))
// 		.pipe(rename({ suffix: ".min" }))
// 		.pipe(uglify())
// 		.pipe(dest("dist/scripts"))
// 		.pipe(notify({ message: "Scripts task complete" }));
// });
