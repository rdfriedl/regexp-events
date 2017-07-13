const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const {banner, amd, moduleName, entry} = require('./config');

module.exports = {
	entry,
	format: 'umd',
	amd,
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
			sourceMaps: true
		})
	],
	dest: 'dist/regexp-events.umd.js',
	sourceMap: true
};
