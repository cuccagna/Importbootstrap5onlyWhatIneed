const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry:"./src/js/index.js",
    output:{
        filename:'js/bundle.js',
        path:path.resolve(__dirname,'./dist'),
        clean:true,
    },
    
    mode:'development',
    devServer: {
        port: 9000,
        static: {
           directory:path.resolve(__dirname, './dist')
        },
        devMiddleware: {
           index: 'index.html',
           writeToDisk:true
        }
     },
     devtool: "source-map",
    module: {
        rules:[
            {
                   mimetype: 'image/svg+xml',
                   scheme: 'data',
                   type: 'asset/resource',
                   generator: {
                     filename: 'icons/[hash].svg'
                   }
                 }
                
                ,
           {
            test: /\.css$/,
            use: ['style-loader',{
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: () => [
                      require('autoprefixer')
                    ]
                  }
                }
              },
               'css-loader' ] 
           },
           {
            test: /\.scss$/,
            use: ['style-loader','css-loader',
            {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: () => [
                      require('autoprefixer')
                    ]
                  }
                }
              },
              'sass-loader'] 
         },
         
        ]
    },



    plugins: [
        new HtmlWebpackPlugin({
        
            inject: false,
            template: "./index.ejs", //Puoi mettere anche un file html
            /*  minify:true */
         })
    ]
}