const rollupConfig = require('./rollup.test.config');

module.exports = function(config) {
	config.set({
		frameworks: ['mocha', 'sinon-chai'],
		plugins: [
			'karma-chrome-launcher',

			'karma-mocha',
			'karma-mocha-reporter',
			'karma-sinon-chai',
			'karma-sourcemap-loader',
			'karma-rollup-plugin'
		],
		browsers: ['Chrome'],
		reporters: ['mocha'],
		files: [
			'../test/index.js'
		],
		preprocessors: {
			'../test/index.js': ['rollup', 'sourcemap']
		},
		rollupPreprocessor: rollupConfig,
		autoWatch: true,
		singleRun: false
	})
};
