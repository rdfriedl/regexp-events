const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const {banner, moduleId, moduleName, entry} = require('./config');

module.exports = {
	entry,
	format: 'es',
	moduleId,
	moduleName,
	banner,
	plugins: [
		resolve(),
		commonjs({
			include: 'node_modules/**'
		}),
	],
	dest: 'dist/regexp-events.es.js',
	sourceMap: true
};