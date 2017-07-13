const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const {minify} = require('uglify-es');
const {minBanner, keepBanner, amd, moduleName, entry} = require('./config');

module.exports = {
	entry,
	format: 'es',
	amd,
	moduleName,
	banner: minBanner,
	plugins: [
		resolve(),
		commonjs({
			include: 'node_modules/**'
		}),
		uglify({
			output: {
				comments: keepBanner
			}
		}, minify)
	],
	dest: 'dist/regexp-events.es.min.js',
	sourceMap: true
};
