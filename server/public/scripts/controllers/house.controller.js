myApp.controller('HouseController', function(MemberService, HouseService, $mdDialog, $routeParams) {
    console.log('HouseController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.memberService = MemberService;

    vm.houseId = $routeParams.id;
    vm.currentHouse = '';
    vm.members = '';

//   vm.currentHouse = {
//     id: vm.houseService.currentHouse.id,
//     name: vm.houseService.currentHouse.name,
//     rent: vm.houseService.currentHouse.rent,
//     closeOutDate: vm.houseService.currentHouse.closeOutDate
// }

//Get data for the house that we are in
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


  //Get members of the house

  vm.getMembers = function(houseId) {
    vm.memberService.getMembers(houseId).then(function(response) {
      vm.members = response.data;
      console.log('vm.members', vm.members);
    })
  }

  vm.getMembers(vm.houseId);


  vm.addTransaction = function (ev) {
    $mdDialog.show({
      templateUrl: '/views/dialogs/dialog.addTransaction.html',
      controller: 'DialogController as dc',
      targetEvent: ev,
      clickOutsideToClose: false
    })
};
  });
  