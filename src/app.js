
var angular = require('angular');

var app = angular.module('app', []);

app.controller('mainCtrl', function($scope) {
  
  $scope.hello = 'Hello All!';
});