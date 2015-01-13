describe('Controller: test', function() {
  var controller, $rootScope;
	var $scope;

  beforeEach(module('frameworks')); 
	beforeEach(inject(function (_$controller_,_$rootScope_) { 
    
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

    controller = $controller('test', { 
		    '$scope': $scope
      });
  }));

  it('should get initialized', function() {
    expect(controller).not.toEqual(undefined);
  }); 

	it('should define $scope.printHello', function () {
		expect(angular.isFunction($scope.printHello)).toBe(true);
		// TODO: add tests for other behaviour here
  });

});
