myApp.controller('UserController', function (MemberService, $location, $mdDialog, UserService, HouseService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.houseService = HouseService;
  vm.memberService = MemberService

  vm.message = ''
  vm.houses = '';
  vm.userHouses = '';
  vm.selectedHouse = '';
  vm.enteredHouseCode = '';

  vm.houseId = {
    id: ''
  }


  vm.getHouseId = function(userHouse) {
    console.log('just clicked on ', userHouse.id);
    vm.houseService.getHouseId(userHouse);
  }

  //Get list of houses that the user is a member of
  vm.getUserHouses = function() {
    vm.houseService.getUserHouses().then(function(response) {
      console.log('vm get user houses', response.data);
      vm.userHouses = response.data;
      if (response.data.length === 0) {
        vm.message = 'You are not connected to a house yet.'
      } else if (response.data.length ===1) {
      } else {
        vm.message = 'Select one of your houses to view and add transactions for that house.'
      }
    })
  }
  vm.getUserHouses();

  //Remove a house from the user's list of houses.
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
          vm.memberService.removeHouse(userHouse.id).then(function(response) {
            swal({title: "You have successfully removed " + userHouse.houseName + " from your houses."});
            vm.getUserHouses();
          })
        } else {
          swal({title: "Cancelled Delete"})
        }
      });
    }
    
  //Get all houses in the database
  vm.getHouses = function () {
    vm.houseService.getHouses().then(function (response) {
      vm.houses = response.data;
    });
  }
  vm.getHouses();

  //This function runs when a user wants to join a new house. When they select a house to join, they are prompted with a Sweet Alert to enter a house code. If the house code is correct, the house is added to their house list. If they enter an incorrect code, a Sweet Alert informs them they have entered the wrong code.
  vm.selectHouse = function (selectedHouse) {
    var dataToSend = {
      house: selectedHouse,
      code: ''
    };
    swal({
      title: "Join " + selectedHouse,
      text: "Plese enter house code:",
      content: "input",
      button: "Join House"
    }).then(function (houseCode) {
      dataToSend.code = houseCode;
      vm.memberService.addMember(houseCode, selectedHouse).then(function (response) {
        if (response.status === 201) {
          swal({
            title: 'You have successfully joined ' + selectedHouse + '!',
            icon: "success"
          })
          console.log('response from member service', response);
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

  //Opens the Create House dialog, which is controlled by dialog.controller.js. After the user creates a house, it will run the getHouses function to get all houses in the database.
  vm.createHouse = function (ev) {
    $mdDialog.show({
      templateUrl: '/views/dialogs/dialog.addHouse.html',
      controller: 'DialogController as dc',
      targetEvent: ev,
      clickOutsideToClose: false
    }).then(function() {
      console.log('here');
      vm.getHouses();
    })
};


}); //End userController