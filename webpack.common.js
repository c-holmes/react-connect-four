const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	//where you want to start
	entry: {
		filename: './src/index.js',
	},
	output: {
		filename: './public/bundle.js'
	},
	module: {
		// how I handle specific files
		loaders: [
			// js
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react','es2015'],
				},
			},
			// scss
			{
			  test: /\.(sass|scss)$/,
			  loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
			}
		],
	},
	plugins: [
		new ExtractTextPlugin('public/style.css', {
		  allChunks: true
		})
	],
};