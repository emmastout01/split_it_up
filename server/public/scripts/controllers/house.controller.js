myApp.controller('HouseController', function(HouseService, $mdDialog) {
    console.log('HouseController created');
    var vm = this;
    vm.houseService = HouseService;


    vm.currentHouse = {
      id: vm.houseService.currentHouse.id,
      name: vm.houseService.currentHouse.name,
      rent: vm.houseService.currentHouse.rent,
      closeOutDate: vm.houseService.currentHouse.closeOutDate
  }
   
  vm.addTransaction = function (ev) {
    $mdDialog.show({
      templateUrl: '/views/dialogs/dialog.addTransaction.html',
      controller: 'DialogController as dc',
      targetEvent: ev,
      clickOutsideToClose: false
    })
};
  });
  