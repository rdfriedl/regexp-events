const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const { banner, amd, moduleName } = require("./config");

module.exports = {
	input: "test/index.js",
	amd,
	plugins: [
		resolve(),
		commonjs({
			include: ["node_modules/**", "dist/**"],
		}),
		babel({
			exclude: "node_modules/**",
			presets: [
				[
					"env",
					{
						useBuiltIns: true,
						modules: false,
					},
				],
			],
			plugins: [
				"external-helpers",
				[
					"istanbul",
					{
						exclude: ["dist/**/*.js", "test/**/*.js", "**/*.spec.js"],
					},
				],
			],
			sourceMaps: true,
			babelrc: false,
		}),
	],
	output: {
		banner,
		format: "iife",
		name: moduleName,
		sourcemap: "inline",
	},
};
