
var angular = require('angular');
var uiRouter = require('angular-ui-router');

var mainStyle = require('./style/main.styl');
var uiRouterConfig = require('./uiRouterConfig.js');

var app = angular.module('app', [uiRouter]).config(uiRouterConfig);
