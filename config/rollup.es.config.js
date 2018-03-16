const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const { banner, amd, moduleName, input } = require("./config");

module.exports = {
	input,
	amd,
	plugins: [
		resolve(),
		commonjs({
			include: "node_modules/**",
		}),
	],
	output: {
		banner,
		file: "dist/regexp-events.es.js",
		format: "es",
		name: moduleName,
		sourcemap: true,
	},
};
