const rollupConfig = require("./rollup.test.config");

module.exports = function(config) {
	config.set({
		frameworks: ["mocha", "sinon-chai", "phantomjs-shim"],
		plugins: [
			"karma-chrome-launcher",
			"karma-phantomjs-launcher",
			"karma-phantomjs-shim",

			"karma-mocha",
			"karma-mocha-reporter",
			"karma-sinon-chai",
			"karma-sourcemap-loader",
			"karma-rollup-plugin",
		],
		browsers: ["PhantomJS"],
		reporters: ["mocha"],
		files: ["../test/index.js"],
		preprocessors: {
			"../test/index.js": ["rollup", "sourcemap"],
		},
		rollupPreprocessor: rollupConfig,
	});
};
