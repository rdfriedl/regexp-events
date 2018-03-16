const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const { banner, amd, moduleName, input } = require("./config");

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
	],
	output: {
		banner,
		file: "dist/regexp-events.umd.js",
		format: "umd",
		name: moduleName,
		sourcemap: true,
	},
};
