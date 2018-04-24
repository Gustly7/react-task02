const path              = require('path');
const webpack           = require('webpack');
const htmlPlugin        = require('html-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin'); 
const autoprefixer      = require('autoprefixer'); 

const PATHS = {
  app: path.join(__dirname, 'src'),
  images:path.join(__dirname,'src/assets/'),
  build: path.join(__dirname, 'dist')
};

const options = {
  host:'localhost',
  port:'1234'
};

module.exports = function(env, options) {
  const isProduction = options.mode === "production";
  
  console.log('options.mode='+options.mode);
  if (isProduction)
	  console.log('isProduction');
  else
	  console.log('not isProduction');
  
  const config = {
  
  
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "none" : "source-map",
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.[hash].js'
  },
  devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port 
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include:PATHS.app
      },
      
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,        
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]'
        }
      },      
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin({
        multiStep: true
    }),
    new htmlPlugin({
      template:path.join(PATHS.app,'index.html'),
      inject:'body'
    }),
    new openBrowserPlugin({
      url: `http://${options.host}:${options.port}`
    })
  ]
};

return config;

};