const path = require("path");
const rollupConfig = require("./config/rollup.test.config");

module.exports = function(config) {
	config.set({
		frameworks: ["source-map-support", "mocha", "sinon-chai"],

		plugins: [
			"karma-chrome-launcher",
			"karma-firefox-launcher",
			"karma-phantomjs-launcher",

			"karma-mocha",
			"karma-mocha-reporter",
			"karma-sinon-chai",
			"karma-source-map-support",
			"karma-rollup-plugin",
			"karma-coverage",
		],

		browsers: ["ChromeHeadless", "FirefoxHeadless", "PhantomJS"],

		customLaunchers: {
			FirefoxHeadless: {
				base: "Firefox",
				flags: ["-headless"],
			},
		},

		files: ["node_modules/core-js/client/shim.min.js", "test/index.js"],

		preprocessors: {
			"test/index.js": ["rollup"],
		},

		rollupPreprocessor: rollupConfig,

		singleRun: true,

		reporters: ["mocha", "coverage"],

		client: {
			captureConsole: false,
			mocha: {
				reporter: "html",
			},
		},

		mochaReporter: {
			output: "autowatch",
			showDiff: true,
		},

		coverageReporter: {
			dir: path.resolve(__dirname, "coverage/"),
			reporters: [{ type: "lcov", subdir: "." }],
		},
	});
};
