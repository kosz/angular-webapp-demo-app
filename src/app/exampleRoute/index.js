angular.module('angular-webapp-demo-app').config([ '$routeProvider', 
function ($routeProvider) {
  
  $routeProvider.when('/exampleRoute', {
    templateUrl: 'app/exampleRoute/exampleRoute.html',
    controller: 'exampleRoute',
    controllerAs: 'exampleRoute' 
  });

}]);
