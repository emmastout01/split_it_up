var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'md.data.table']);

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
    .when('/houseHome/:id', {
      templateUrl: '/views/templates/houseHome.html',
      controller: 'HouseController as hc',
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
    .when('/myAccount/:id', {
      templateUrl: '/views/templates/myAccount.html',
      controller: 'AccountController as ac',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/about/:id', {
      templateUrl: '/views/templates/about.html',
      controller: 'AboutController as ac',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
