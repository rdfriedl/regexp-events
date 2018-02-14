const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const { banner, amd, moduleName, entry } = require("./config");

module.exports = {
	entry,
	format: "cjs",
	amd,
	moduleName,
	banner,
	plugins: [
		resolve(),
		commonjs({
			include: "node_modules/**",
		}),
		babel({
			exclude: "node_modules/**",
			presets: [
				[
					"env",
					{
						modules: false,
						targets: {
							node: "current",
						},
					},
				],
			],
			sourceMaps: true,
			babelrc: false,
		}),
	],
	dest: "dist/regexp-events.js",
	sourceMap: true,
};
