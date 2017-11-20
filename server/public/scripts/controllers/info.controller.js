myApp.controller('InfoController', function(HouseService) {
  console.log('InfoController created');
  var vm = this;
  vm.houseService = HouseService;

  vm.addHouse = function(newHouse) {
    vm.houseService.addHouse(newHouse);
  }

  vm.buttonClick = function() {
    console.log('button clicked');
  }


  
});
