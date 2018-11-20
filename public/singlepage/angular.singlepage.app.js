var myApp = angular.module('ngclient', ['ngRoute']);

myApp.config(function($routeProvider, $httpProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'singlepage/partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/', {
      templateUrl: 'singlepage/partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/page1', {
      templateUrl: 'singlepage/partials/page1.html',
      controller: 'Page1Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/page2', {
      templateUrl: 'singlepage/partials/page2.html',
      controller: 'Page2Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/page3', {
      templateUrl: 'singlepage/partials/page3.html',
      controller: 'Page3Ctrl',
      access: {
        requiredLogin: true
      }
    }).otherwise({
      redirectTo: '/login'
    });
});

myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in




  AuthenticationFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
      if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.role = AuthenticationFactory.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });

});











//controller.js
//this controller is being used in the header.html.
//isActive isbeing used in to indicate which item in the top menu is active
myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
  function($scope, $location, UserAuthFactory) {

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.logout = function () {
      UserAuthFactory.logout();
    }
  }
]);





myApp.controller("HomeCtrl", ['$scope',
  function($scope) {
      $scope.name = "Home Controller";
  }
]);



myApp.controller("Page1Ctrl", ['$scope', '$window', '$location', 'dataFactory',
  function($scope, $window, $location, dataFactory) {
      $scope.name = "Page1 Controller";
      $scope.AllUsers = [];

/*
      you can implement the client side check but better implement the server side check that
      user who is accessing this URL has the admin role.
      if($window.sessionStorage.userRole != "admin")
      {
          alert("You do not have permission to access this page");
          $location.path("/");
      }*/

      dataFactory.getAllUsers().then(function(data) {
          //this function will not be called atall if server return 403 access code. which is
          //unauthorized code.  that is catch by browser and shows in console
          //that this is unauthorized access
          $scope.AllUsers = data.data
      });

  }
]);



myApp.controller("Page2Ctrl", ['$scope', 'dataFactory',
  function($scope, dataFactory)
  {
    $scope.name = "Page2 Controller";
    $scope.itemtofeatch = 1;

    $scope.prodid = "";
    $scope.prodname = "";

    $scope.productslist = null;

    if(dataFactory.AllProducts == null)
    {
        dataFactory.getAllProducts().then(function(data) {
            dataFactory.AllProducts = data.data;
            $scope.productslist = data.data;
        });
    }
    else
        $scope.productslist = dataFactory.AllProducts;


    $scope.GetProductFromBackend = function()
    {
          dataFactory.getOneProduct($scope.itemtofeatch).then(function(data) {
              if(data.data.status == 1)
              {
                  $scope.prodid = data.data.id;
                  $scope.prodname = data.data.name;
              }
              else {
                  $scope.prodid = "";
                  $scope.prodname = "";
                  alert("Product not found");
              }
          });
    }

  }
]);



myApp.controller("Page3Ctrl", ['$scope', 'dataFactory',
  function($scope, dataFactory)
  {
      $scope.products = [];

      if(dataFactory.AllProducts == null)
      {
          dataFactory.getAllProducts().then(function(data) {
              $scope.products = data.data;
              dataFactory.AllProducts = data.data;
          });
      }
      else
          $scope.products = dataFactory.AllProducts;
  }
]);







//fectory.js
myApp.factory('dataFactory', function($http) {

      /*var _prodFactory = {};
      _prodFactory.getAllProducts = function()
      {
          var urlBase = 'http://localhost:3000/rest/v1/products';
          return $http.get(urlBase);
      };
      _prodFactory.getOneProduct = function(prodid)
      {
          var urlBase = 'http://localhost:3000/rest/v1/product/' + prodid;
          return $http.get(urlBase);
      };*/



      var _prodFactory = {
            AllProducts:null,     //use this variable as place holder. if this is already set then
                                  //no need to get all products from the server again.
                                  //used this in Page3Ctrl and Page2Ctrl.  in both cases  the check is made that
                                  //data factory contains the products. if yes then no need to call server again

            getAllProducts: function()
            {
                var urlBase = 'http://localhost:3000/rest/v1/products';
                return $http.get(urlBase);
            },

            getOneProduct:function(prodid)
            {
                var urlBase = 'http://localhost:3000/rest/v1/product/' + prodid;
                return $http.get(urlBase);
            },


            getAllUsers:function()
            {
                var urlBase = 'http://localhost:3000/rest/v1/admin/users';
                return $http.get(urlBase);
            }

     };


      return _prodFactory;
});
