myApp.controller('HouseNavController', function($routeParams, HouseService) {
    console.log('HouseNavController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.houseId = $routeParams.id;
  });
  