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

  vm.getUserHouses = function(userId) {
    //OR: Do a get houses for a particular user request. I'll need to do this in order to show what houses a member is a part of. If the user is a member of one or more houses, the message is 'select a house' and the houses are shown below that. If the user is not a member of a house, the message is 'you're not connected'
    //get request with req.params as user id
    
    //Call a get request from the service here
    vm.houseService.getUserHouses(userId).then(function(response) {
      console.log('get user houses worked!');
      vm.userHouses = response.data;
      if (response.data.length === 0) {
        console.log('no houses!')
        vm.message = 'You are not connected to a house yet.'
      } else {
        vm.message = 'Select one of your houses to view and add transactions for that house.'
      }
    })
  }

  vm.getUserHouses(2);
  // getUserHouses(vm.userObject._id) <--Or something? Something to access the user

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

