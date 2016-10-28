
var isDeploy = isArgs('--deploy');

var path = require('path');
var webpack = require('webpack');
var typeOf = require('./modules/typeOf.js');

var commonPlagins = [
  new webpack.DefinePlugin({
    'ENV_isDeploy': JSON.stringify(isDeploy)
  })
];
var devPlagins = [
  new webpack.HotModuleReplacementPlugin(),
];
var deployPlagins = [
  new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    compress: {warnings: false}
  })
];

module.exports = {
  entry: setEntrySources([
    path.join(__dirname, '/src/app.js')
  ]),
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'app.js',
    publicPath: '/build/'
  },

  plugins: isDeploy ? commonPlagins.concat(deployPlagins) : commonPlagins.concat(devPlagins),

  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: path.join(__dirname, "/src"),
      query: {
        presets: [] //['es2015']
      }
    }, {
      test: /\.styl?$/,
      loader: 'style!css!stylus',
    }, {
      test: /\.(html)?$/,
      loader: 'file',
      include: path.join(__dirname, "/src/views/"),
      query: {
        name: 'views/[name].[ext]'
      }
    }]
  },

  //devtool: isDeploy ? null : 'eval',
};

function isArgs(str) {
  return (process.argv.indexOf(str) > -1);
}

function setEntrySources(sources) {
  if(!isDeploy) {
    var devClientPath = 'webpack-dev-server/client';
    switch( typeOf(sources) ) {
    case('object'):
      var tempObj = {};
      for(var key in sources) {
        tempObj[key] = setEntrySources(sources[key]);
      }
      return tempObj;
    case('array'):
      var tempArr = [devClientPath];
      for(var i=0; i<sources.length; i++) {
        tempArr.push(sources[i]);
      }
      return tempArr;
    case('string'):
      var tempArrStr = [devClientPath];
      tempArrStr.push(sources);
      return tempArrStr;
    default:
      return sources;
    }
  }
  return sources;
}
