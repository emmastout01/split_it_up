myApp.controller('HouseNavController', function(HouseService) {
    console.log('HouseNavController created');
    var vm = this;
    vm.houseService = HouseService;

    vm.houseId = vm.houseService.currentHouse.id;
    console.log('house nav id', vm.houseId);
  });
  