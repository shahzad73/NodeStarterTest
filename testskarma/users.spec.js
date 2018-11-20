

describe("Testing the factory greeter", function() {
  var greeter;
  var $rootScope;
  beforeEach(module('demo'));

  beforeEach(inject(function(_greeter_, _$rootScope_) {
    greeter = _greeter_;
    $rootScope = _$rootScope_;
  }));

  it("says Hello to me", function() {
    expect(greeter.getGreeting("Dave")).toEqual("Hello Dave");
  });


  it('Should present the toBe matcher example', function() {
    var a = 1;
    var b = a;
    expect(a).toBe(b);
    expect(a).not.toBe(null);
  });

  // 4. Test it
  it("should promise me a value", function() {
    // 5. Set up a value to receive the promise
    var returnValue;

    // 6. Call the promise, and .then(save that value)
    greeter.getPromise(42).then(function(val) {
      returnValue = val;
    });

    // 7. Run the digest function!!!1
    $rootScope.$digest();

    // 8. Check the value
    expect(returnValue).toEqual(42);
  });

});




describe("Testing the controller", function() {
  // 1. Import the module
  beforeEach(module('demo'));

  // 2. Inject $controller and $rootScope
  var ScopeCtrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    // 3. Create a scope
    scope = $rootScope.$new();

    // 4. Instantiate with $controller, passing in scope
    ScopeCtrl = $controller('ScopeCtrl', {$scope: scope});
  }));

  // 5. Test the controller
  it("should have a value", function() {
    expect(scope.someValue).toEqual(42);
  });

  it("should have a message", function() {
    expect(scope.getMessage()).toEqual("scope!");
  });

  // 5. Test the controller
  it("should have a value", function() {
    expect(scope.myval).toEqual("Abc");
  });


  it('1 + 1 should equal 2', function () {
    scope.no1 = 1;
    scope.no2 = 2;
    scope.sum();
    expect(scope.no3).toBe(3);
  });

});












//Testing a service that calls backend services
describe('myserv', function () {
    var myserv, httpBackend;
    //2.
    beforeEach(function () {
        //3. load the module.
        beforeEach(module('demo'));

        // 4. get your service, also get $httpBackend
        // $httpBackend will be a mock.
        inject(function ($httpBackend, _myserv_) {
            myserv = _myserv_;
            httpBackend = $httpBackend;
        });
    });

    // 5. make sure no expectations were missed in your tests.
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //6.
    it('ServiceTestSpec', function () {

        var returnData = {"a":"bbbb"};
        var testData = {"a":"bbbb1"};

        //7. expectGET to make sure this is called once.
        httpBackend.expectGET("http://localhost:36337/api/EmployeeInfoAPI/1").respond(returnData);

        //8. make the call.
        var returnedPromise = myserv.get(1);

        //9. set up a handler for the response, that will put the result
        // into a variable in this scope for you to test.
        var result;
        returnedPromise.then(function (response) {
            result = response.data;
        });

        //10. flush the backend to "execute" the request to do the expectedGET assertion.
        httpBackend.flush();

        //11. check the result.
        expect(result).toEqual(returnData);

    });


});
