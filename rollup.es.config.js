import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'src/index.js',
	format: 'es',
	moduleId: 'regexp-events',
	moduleName: 'RegExpEvents',
	plugins: [
		resolve(),
		commonjs()
	],
	dest: 'dist/regexp-events.es.js',
	sourceMap: true
};