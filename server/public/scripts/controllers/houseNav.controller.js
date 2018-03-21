myApp.controller('HouseNavController', function(UserService, $routeParams, $mdDialog, HouseService) {
    var vm = this;
    vm.houseService = HouseService;
    vm.userService = UserService;

    // vm.houseId = vm.houseService.currentHouse.id;
    vm.houseId = $routeParams.id;

    //On click of 'New Transaction' in nav bar, an Add Transaction dialog pops up; controlled by dialog.controller.js.
    vm.addTransaction = function (ev) {
      $mdDialog.show({
        templateUrl: '/views/dialogs/dialog.addTransaction.html',
        controller: 'DialogController as dc',
        targetEvent: ev,
        clickOutsideToClose: false
      })
    };

  });
  