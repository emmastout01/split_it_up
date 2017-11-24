var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/houseHome/:id', {
      templateUrl: '/views/templates/houseHome.html',
      controller: 'HouseController as hc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/addTransaction/:id', {
      templateUrl: '/views/templates/addTrans.html',
      controller: 'TransactionController as tc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/viewTransactions/:id', {
      templateUrl: '/views/templates/viewTrans.html',
      controller: 'TransactionController as tc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    // .otherwise({
    //   redirectTo: 'home'
    // });
});
