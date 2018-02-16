const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");
const babel = require("rollup-plugin-babel");
const { minBanner, keepBanner, moduleName, amd, entry } = require("./config");

module.exports = {
	entry,
	format: "umd",
	amd,
	moduleName,
	banner: minBanner,
	plugins: [
		resolve(),
		commonjs({
			include: "node_modules/**",
		}),
		babel({
			exclude: "node_modules/**",
			presets: [["env", { modules: false }]],
			plugins: ["external-helpers"],
			sourceMaps: true,
			babelrc: false,
		}),
		uglify({
			output: {
				comments: keepBanner,
			},
		}),
	],
	dest: "dist/regexp-events.umd.min.js",
	sourceMap: true,
};
