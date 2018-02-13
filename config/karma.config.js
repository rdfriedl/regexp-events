const path = require("path");
const rollupConfig = require("./rollup.test.config");

module.exports = function(config) {
	config.set({
		frameworks: ["mocha", "sinon-chai", "detectBrowsers", "phantomjs-shim"],
		plugins: [
			"karma-chrome-launcher",
			"karma-edge-launcher",
			"karma-firefox-launcher",
			"karma-ie-launcher",
			"karma-safari-launcher",
			"karma-safaritechpreview-launcher",
			"karma-opera-launcher",
			"karma-phantomjs-launcher",
			"karma-phantomjs-shim",

			"karma-detect-browsers",
			"karma-mocha",
			"karma-mocha-reporter",
			"karma-sinon-chai",
			"karma-sourcemap-loader",
			"karma-rollup-plugin",
			"karma-coverage",
			"karma-coverage-html-index-reporter",
		],
		reporters: ["mocha", "coverage", "coverage-html-index"],
		// this is the entry file for all our tests.
		files: ["../test/index.js"],
		// we will pass the entry file to rollup for bundling.
		preprocessors: {
			"../test/index.js": ["rollup", "sourcemap"],
		},
		// use the rollup config
		rollupPreprocessor: rollupConfig,
		singleRun: true,
		coverageReporter: {
			type: "html",
			dir: path.resolve(__dirname, "../coverage/"),
		},
	});
};
