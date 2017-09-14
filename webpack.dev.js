const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	devtool: 'source-map',
	devServer: {
	  contentBase: './public',
	  compress: true,
	  port: 9000
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
});