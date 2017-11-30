myApp.controller('HouseNavController', function($routeParams, HouseService) {
    console.log('HouseNavController created');
    var vm = this;
    vm.houseService = HouseService;

    // vm.houseId = vm.houseService.currentHouse.id;
    vm.houseId = $routeParams.id;

    console.log('house nav id', vm.houseId);
  });
  