const webpack = require("webpack");

module.exports = {
	entry: {
		'build': './src/bubble-anim.js',
		'docs': './src/bubble-anim.js'
	},
	output: {
		filename: "./[name]/bubble-anim.min.js"
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	],
}

