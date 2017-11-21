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

  vm.removeHouse = function(userHouse) {
    console.log('user house', userHouse, userHouse.id);
      swal({
        title: "Are you sure you want to remove " + userHouse.houseName + " from your houses?",
        text: "You will no longer be able to add and view transactions for this house.",
        icon: "warning",
        buttons: ["Cancel","OK"],
        dangerMode: true,
      }).then(function(willDelete) {
        if (willDelete) {
          vm.houseService.removeHouse(userHouse.id).then(function(response) {
            swal({title: "You have successfully removed " + userHouse.houseName + " from your houses."});
            vm.getUserHouses();
          })
        } else {
          swal({title: "Phew!"})
        }
      });
    }
    

  vm.getHouses = function () {
    vm.houseService.getHouses().then(function (response) {
      vm.houses = response.data;
    });
  }
  vm.getHouses();

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
        else if (response.status === 409) {
          swal({
            title: 'You already belong to ' + selectedHouse + '!',
            icon: 'warning'
          })
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

