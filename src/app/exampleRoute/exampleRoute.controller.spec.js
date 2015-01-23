describe('Controller: exampleRoute', function() {
  var controller, $rootScope;
    

  beforeEach(module('angular-webapp-demo-app')); 
    beforeEach(inject(function (_$controller_,_$rootScope_) { 
    
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        

    controller = $controller('exampleRoute', { 
      });
  }));

  it('should get initialized', function() {
    expect(controller).not.toEqual(undefined);
  }); 

});
