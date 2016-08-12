
var angular = require('angular');
var uiRouter = require('angular-ui-router');

var uiRouterConfig = require('./uiRouterConfig.js');

var app = angular.module('app', [uiRouter]).config(uiRouterConfig);

/*
app.controller('mainCtrl', ($scope) => {
  
  $scope.hello = 'Hello All!__!';
});
*/
