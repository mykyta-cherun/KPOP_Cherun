var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 
module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
      },
   output:{
       path: path.resolve(__dirname, './public'),     
       publicPath: '/public/',
       filename: "[name].js"       
   },
   resolve: {
    extensions: ['.ts', '.js']
  },
   module:{
       rules:[   
           {
               test: /\.ts$/, 
               use: [
                {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                  } ,
                   'angular2-template-loader'
               ]
            },{
              test: /\.html$/,
              loader: 'html-loader'
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname,'src/app'),
                loader: 'raw-loader'
              }
       ]
   },
   plugins: [
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core/,
        path.resolve(__dirname, 'src'), 
      {} 
    ),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'polyfills']
      }),
    new UglifyJSPlugin()
  ]
}
