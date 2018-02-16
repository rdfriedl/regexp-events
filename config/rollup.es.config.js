const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const { banner, amd, moduleName, entry } = require("./config");

module.exports = {
	entry,
	format: "es",
	amd,
	moduleName,
	banner,
	plugins: [
		resolve(),
		commonjs({
			include: "node_modules/**",
		}),
	],
	dest: "dist/regexp-events.es.js",
	sourceMap: true,
};
