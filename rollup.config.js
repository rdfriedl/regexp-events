import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	format: 'cjs',
	moduleId: 'regexp-events',
	moduleName: 'RegExpEvents',
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			presets: ['es2015-rollup']
		}),
	],
	dest: 'dist/regexp-events.js',
	sourceMap: true
};