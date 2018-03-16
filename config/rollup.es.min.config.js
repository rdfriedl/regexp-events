const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");
const { minify } = require("uglify-es");
const { minBanner, keepBanner, amd, moduleName, input } = require("./config");

module.exports = {
	input,
	amd,
	plugins: [
		resolve(),
		commonjs({
			include: "node_modules/**",
		}),
		uglify(
			{
				output: {
					comments: keepBanner,
				},
			},
			minify,
		),
	],
	output: {
		banner: minBanner,
		file: "dist/regexp-events.es.min.js",
		format: "es",
		name: moduleName,
		sourcemap: true,
	},
};
