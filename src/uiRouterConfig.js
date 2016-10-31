
var mainStyle = require('./style/main.styl');

var uiRouterConfig = function($stateProvider, $urlRouterProvider, $locationProvider) {
  /*
  //Wiil be use, with server settings.
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  */
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: require('./views/main.html'),
      controller: require('./controllers/mainCtrl.js')
    })
    .state('home', {
      url: '/home',
      templateUrl: require('./views/home.html'),
      controller: require('./controllers/homeCtrl.js')
    })
    .state('images', {
      url: '/images',
      templateUrl: require('./views/images.html'),
      controller: require('./controllers/imagesCtrl.js')
    });

  $urlRouterProvider.otherwise('/');
}

module.exports = uiRouterConfig;
