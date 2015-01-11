describe('Controller: mainCtrl', function() {
  var controller, $rootScope;
	var $scope;

  beforeEach(module('anglr')); 
	beforeEach(inject(function (_$controller_,_$rootScope_) { 
    
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

    controller = $controller('mainCtrl', { 
		    '$scope': $scope
      });
  }));

  it('should get initialized', function() {
    expect(controller).not.toEqual(undefined);
  }); 

	it('should define $scope.asdf', function () {
		expect(angular.isFunction($scope.asdf)).toBe(true);
		// TODO: add tests for other behaviour here
  });

	it('should define $scope.terw', function () {
		expect(angular.isFunction($scope.aterw)).toBe(true);
		// TODO: add tests for other behaviour here
  });

});
