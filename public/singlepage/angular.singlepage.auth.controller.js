myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
    $scope.user = {
      username: 'admin1@myapp.com',
      password: ''
    };

    $scope.login = function() {

      var username = $scope.user.username,
        password = $scope.user.password;

      if (username !== undefined && password !== undefined) {
        UserAuthFactory.login(username, password).success(function(data) {

              AuthenticationFactory.isLogged = true;
              AuthenticationFactory.user = data.user.username;
              AuthenticationFactory.userRole = data.user.role;

              $window.sessionStorage.token = data.token;
              $window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
              $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

              $location.path("/");

        }).error(function(status) {
            if(status.status == 401)
                alert("Login credentials are not correct")
            else
                alert('Oops something went wrong!');

        });
      } else {
        alert('Invalid credentials');
      }

    };

  }
]);





//auth.factory.js

myApp.factory('AuthenticationFactory', function($window) {
  var auth =
  {
        isLogged: false,

        check: function()
        {
              if ($window.sessionStorage.token && $window.sessionStorage.user) {
                this.isLogged = true;
              } else {
                this.isLogged = false;
                delete this.user;
              }
        }
  }

  return auth;
});

myApp.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  return {
    login: function(username, password) {
      return $http.post('http://localhost:3000/login', {username: username,password: password });
    },
    logout: function() {

          if (AuthenticationFactory.isLogged)
          {
                AuthenticationFactory.isLogged = false;
                delete AuthenticationFactory.user;
                delete AuthenticationFactory.userRole;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;

                $location.path("/login");
          }

    }
  }
});

myApp.factory('TokenInterceptor', function($q, $window) {
    return {

              request: function(config)
              {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.token) {
                      config.headers['X-Access-Token'] = $window.sessionStorage.token;
                      config.headers['X-Key'] = $window.sessionStorage.user;
                      config.headers['X-Role'] = $window.sessionStorage.userRole;
                      config.headers['Content-Type'] = "application/json";
                    }
                    return config || $q.when(config);
              },

              response: function(response) {
                    return response || $q.when(response);
              }
    };
});
