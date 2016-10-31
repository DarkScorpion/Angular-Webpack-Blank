
var isDeploy = isArgs('--deploy');

var join = require('path').join;
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
    join(__dirname, '/src/app.js')
  ]),
  output: {
    filename: 'app.js',
    path: join(__dirname, '/build/'),
    publicPath: '/build/'
  },

  plugins: isDeploy ? commonPlagins.concat(deployPlagins) : commonPlagins.concat(devPlagins),

  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: join(__dirname, "/src/"),
      query: {
        presets: [] //['es2015']
      }
    }, {
      test: /\.styl?$/,
      loader: 'style!css!stylus',
    }, {
      test: /\.(html)?$/,
      loader: 'file',
      include: join(__dirname, "/src/views/"),
      query: {
        name: 'views/[name].[ext]'
      }
    }, {
      test: /\.(png|jpg)?$/,
      loader: 'file',
      include: join(__dirname, "/src/images/"),
      query: {
        name: 'images/[name].[ext]'
      }
    }]
  },
  
};

function isArgs(str) {
  return (process.argv.indexOf(str) > -1);
}

function setEntrySources(sources) {
  if (isDeploy) return sources;

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
