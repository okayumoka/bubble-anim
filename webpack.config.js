const webpack = require("webpack");

module.exports = {
	entry: './bubble-anim.js',
	output: {
		filename: "./bubble-anim.min.js"
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	],
}

