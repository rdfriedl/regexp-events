import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	format: 'umd',
	moduleId: 'regexp-events',
	moduleName: 'RegExpEvents',
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			presets: ['es2015-rollup']
		}),
		uglify()
	],
	dest: 'dist/regexp-events.umd.js',
	sourceMap: true
};