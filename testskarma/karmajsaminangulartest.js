angular.module('demo', []).factory('greeter', function($q) {
  return {


    getGreeting: function(name) {
      return "Hello " + name;
    },

    //testing promises
    getPromise: function(value) {
        return $q.when(value);
    }

  };
});




angular.module('demo').controller('ScopeCtrl', function($scope) {
  $scope.someValue = 42;

  $scope.myval = "Abc";

  $scope.getMessage = function() {
    return "scope!";
  }


  $scope.no1 = 0;
  $scope.no2 = 0;
  $scope.no3 = 0;
  $scope.sum = function() {
    $scope.no3 = $scope.no1 + $scope.no2;
  };

});





angular.module('demo').service('myserv', function ($http) {

    this.getData = function () {
        var result = $http.get("http://localhost:36337/api/EmployeeInfoAPI");
        return result; //deferrer
    };

    this.get = function (id) {
        var result = $http.get("http://localhost:36337/api/EmployeeInfoAPI/" + id);
        return result; //deferrer
    };


});
