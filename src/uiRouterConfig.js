
var uiRouterConfig = function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

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
    });

  $urlRouterProvider.otherwise('/');
}

module.exports = uiRouterConfig;
