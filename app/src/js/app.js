'use strict';

var myAppControllers = angular.module('myAppControllers', []);
var myAppServices = angular.module('myAppServices', []);
var myAppDirectives = angular.module('myAppDirectives', []);
var myAppFilters = angular.module('myAppFilters', []);

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myAppControllers',
  'myAppDirectives',
  'myAppServices',
  'myAppFilters'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/view1', {
	    templateUrl: 'dist/partials/view1.html',
	    controller: 'Module1Ctrl'
	}).
	when('/view2', {
	    templateUrl: 'dist/partials/view2.html',
	    controller: 'Module2Ctrl'
	}).
	when('/view3', {
	    templateUrl: 'dist/partials/view3.html',
	    controller: 'Module3Ctrl'
	})
	.otherwise({redirectTo: '/'});
}]);