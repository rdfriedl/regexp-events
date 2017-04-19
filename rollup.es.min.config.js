import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-js';

export default {
	entry: 'src/index.js',
	format: 'es',
	moduleId: 'regexp-events',
	moduleName: 'RegExpEvents',
	plugins: [
		resolve(),
		commonjs(),
		uglify({}, minify)
	],
	dest: 'dist/regexp-events.es.min.js',
	sourceMap: true
};