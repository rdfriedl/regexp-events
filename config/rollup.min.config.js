const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");
const babel = require("rollup-plugin-babel");
const { minBanner, keepBanner, amd, moduleName, entry } = require("./config");

module.exports = {
	entry,
	format: "cjs",
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
			presets: ["es2015-rollup"],
			sourceMaps: true,
		}),
		uglify({
			output: {
				comments: keepBanner,
			},
		}),
	],
	dest: "dist/regexp-events.min.js",
	sourceMap: true,
};
