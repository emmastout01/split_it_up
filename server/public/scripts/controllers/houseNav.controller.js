myApp.controller('HouseNavController', function(UserService, $routeParams, $mdDialog, HouseService) {
    console.log('HouseNavController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.userService = UserService;

    // vm.houseId = vm.houseService.currentHouse.id;
    vm.houseId = $routeParams.id;

    //On click of 'New Transaction' in nav bar, an Add Transaction dialog pops up; controlled by dialog.controller.js.
    vm.addTransaction = function (ev) {
      console.log('in button click');
      $mdDialog.show({
        templateUrl: '/views/dialogs/dialog.addTransaction.html',
        controller: 'DialogController as dc',
        targetEvent: ev,
        clickOutsideToClose: false
      })
    };
  
    console.log('house nav id', vm.houseId);
  });
  