myApp.controller('UserController', function (UserService, HouseService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.houseService = HouseService;

  vm.message = ''
  vm.houses = '';
  vm.userHouses = '';
  vm.selectedHouse = '';
  vm.enteredHouseCode = '';

  vm.getHouses = function () {
    vm.houseService.getHouses().then(function (response) {
      vm.houses = response.data;
    });
  }
  vm.getHouses();

  vm.getUserHouses = function() {
    vm.houseService.getUserHouses().then(function(response) {
      vm.userHouses = response.data;
      if (response.data.length === 0) {
        console.log('no houses!')
        vm.message = 'You are not connected to a house yet.'
      } else {
        vm.message = 'Select one of your houses to view and add transactions for that house.'
      }
    })
  }
  vm.getUserHouses();


  vm.selectHouse = function (selectedHouse) {
    console.log('in selectHouse', selectedHouse);
    // This function will then either ng-show an input field for house code and "join house" button, or create an alert to enter the code
    var dataToSend = {
      house: selectedHouse,
      code: ''
    };
    swal({
      title: "Join House",
      text: "Plese enter house code:",
      content: "input",
      button: "Join House"
    }).then(function (houseCode) {
      dataToSend.code = houseCode;
      vm.houseService.addMember(houseCode, selectedHouse).then(function (response) {
        if (response.status === 201) {
          swal({
            title: 'You have successfully joined ' + selectedHouse + '!',
            icon: "success"
          })
          vm.getUserHouses();
        }
        else if (response.status === 401) {
          swal({
            title: 'Incorrect house code',
            icon: "error"
          });
        }
        console.log('response from server', response.status);
      })
    }); //End sweet alert post route
  } //End selectHouse

vm.createHouse = function() {
//   var houseToSend = {
//     houseName: newHouse.houseName,
//     houseCode: newHouse.houseCode,
//     totalRent: newHouse.totalRent,
//     closeOutDate: newHouse.closeOutDate
// }

}







}); //End userController

  // vm.joinHouse = function(enteredHouseCode, selectedHouse) {
  //   console.log('in join house', enteredHouseCode, ',', selectedHouse);
  //   vm.houseService.addMember(enteredHouseCode, selectedHouse).then(function(response) {
  //     if (response.status === 401) {
  //       swal('uh oh!');
  //     }
  //     console.log('response from server', response.status);
  //   })

