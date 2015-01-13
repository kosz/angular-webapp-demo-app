angular.module('frameworks').config([ '$routeProvider', 
function ($routeProvider) {
  
  $routeProvider.when('/test', {
    templateUrl: 'app/test/test.html',
    controller: 'test',
    controllerAs: 'test' 
  });

}]);
