const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		filename: "js/bundle.[contenthash].js",
		path: path.resolve(__dirname, "./dist"),
		clean: true,
	},
	mode: "production",
	optimization: {
		//Gli stiamo dicendo che vogliamo che i file vengano minificati
		minimize: true,
		//Qui specifichiamo quale tool usare per la minificazione,è
		//un array quindi possiamo passare più minimizer
		//Possiamo prendere le opzioni possibili da cssnano e
		//dalla pagina di cssMinimizerPlugin
		minimizer: [
			`...`, //Questo dice a Webpack di non sovrascrivere il plugin di default, Terser
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComments: { removeAll: true },
						},
					],
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: () => [require("autoprefixer")],
							},
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: () => [require("autoprefixer")],
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/env",
								{
									targets: "> 0.1%, not dead",
									debug: true,
									useBuiltIns: "usage",
									//Puoi mettere anche solo version:3
									//La versione la puoi prelevare da package.json
									corejs: { version: 3.27, proposals: true },
								},
							],
						],
						//plugins: ['@babel/plugin-proposal-class-properties']
					},
				},
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/main.[contenthash].css",
		}),
		new HtmlWebpackPlugin({
			inject: false,
			template: "./index.ejs", //Puoi mettere anche un file html
			/*  minify:true */
		}),
	],
};
