myApp.controller('HouseController', function(HouseService, $mdDialog, $routeParams) {
    console.log('HouseController created');
    var vm = this;
    vm.houseService = HouseService;

    vm.houseId = $routeParams.id;
    console.log('house  id in house home controller', vm.houseId);

    //Here: I think instead of pulling from the house service (although maybe that's already enough?), I could instead use the $routeParams id as a parameter or something for a request to the database--get everything for the house whose id is $routeParams.id, and then the data sent back would be name, rent, closeOutDate.

  //   vm.currentHouse = {
  //     id: vm.houseService.currentHouse.id,
  //     name: vm.houseService.currentHouse.name,
  //     rent: vm.houseService.currentHouse.rent,
  //     closeOutDate: vm.houseService.currentHouse.closeOutDate
  // }

  vm.currentHouse = {
    id: vm.houseService.currentHouse.id,
    name: vm.houseService.currentHouse.name,
    rent: vm.houseService.currentHouse.rent,
    closeOutDate: vm.houseService.currentHouse.closeOutDate
}
   
  vm.getCurrentHouse = function(houseId) {
    vm.houseService.getCurrentHouse(houseId).then(function(response) {
      console.log('we are in house', response.data[0]);
      vm.currentHouse = {
        id: response.data[0].id,
        name: response.data[0].houseName,
        rent: response.data[0].totalRent,
        closeOutDate: response.data[0].closeOutDate
    }
    })
    
  }

  vm.getCurrentHouse(vm.houseId);

  vm.addTransaction = function (ev) {
    $mdDialog.show({
      templateUrl: '/views/dialogs/dialog.addTransaction.html',
      controller: 'DialogController as dc',
      targetEvent: ev,
      clickOutsideToClose: false
    })
};
  });
  