const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify');

let babelPlugin = babel({
	exclude: 'node_modules/**',
	presets: ['es2015-rollup']
});

let options = {
	format: 'umd',
	moduleName: 'RegExpEvents',
	globals: {
		'lodash.isfunction': 'isFunction',
		'lodash.isstring': 'isString',
		'lodash.isnil': 'isNil'
	},
	sourceMap: true
};

rollup.rollup({
	entry: 'src/index.js'
}).then((bundle) => {
	let builds = [];

	builds.push(bundle.write(Object.assign({}, options, {
		plugins: [
			resolve(),
			babel({
				exclude: 'node_modules/**',
				presets: ['es2015-rollup']
			})
		],
		dest: 'dist/regexp-events.js'
	})));

	//build the min version
	// builds.push(bundle.write({
	// 	format: 'umd',
	// 	moduleName: 'RegExpEvents',
	// 	plugins: [
	// 		resolve(),
	// 		babel({
	// 			exclude: 'node_modules/**',
	// 			presets: ['es2015-rollup']
	// 		}),
	// 		uglify({
	// 			output: {
	// 				comments: false,
	// 				minify: true
	// 			}
	// 		})
	// 	],
	// 	dest: 'dist/regexp-events.min.js',
	// 	sourceMap: true
	// }));

	return Promise.all(builds);
}).catch(err => {
	console.error('failed to build');
	if(err.frame);
		console.log(err.frame);

	console.error(err.message, err.stack, err);
	process.exit(1);
});
