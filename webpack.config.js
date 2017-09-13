const path = require('path');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
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
			{ // sass / scss loader for webpack
			  test: /\.(sass|scss)$/,
			  loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
			}
		],
	},
	devServer: {
	  contentBase: path.join(__dirname, "public"),
	  compress: true,
	  port: 9000
	},
	plugins: [
		// uglifyjs
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			output: { comments: false },
			sourceMap: true,
		}),
		// env plugin
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
		}),
		new ExtractTextPlugin('public/style.css', {
		  allChunks: true
		})
	],
};