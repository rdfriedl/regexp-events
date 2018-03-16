const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");
const babel = require("rollup-plugin-babel");
const { minBanner, keepBanner, moduleName, amd, input } = require("./config");

module.exports = {
	input,
	amd,
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
	output: {
		banner: minBanner,
		file: "dist/regexp-events.umd.min.js",
		format: "umd",
		name: moduleName,
		sourcemap: true,
	},
};
