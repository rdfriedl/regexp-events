const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const {banner, moduleId, moduleName} = require('./config');

module.exports = {
	entry: 'test/index.js',
	format: 'iife',
	moduleId,
	moduleName,
	banner,
	plugins: [
		resolve(),
		commonjs({
			include: 'node_modules/**'
		}),
		babel({
			exclude: 'node_modules/**',
			presets: ['es2015-rollup'],
			plugins: ['istanbul'],
			sourceMaps: true
		})
	],
	sourceMap: true
};