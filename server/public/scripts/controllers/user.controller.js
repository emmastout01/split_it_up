myApp.controller('UserController', function(UserService, HouseService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.houseService = HouseService;

  vm.houses = '';

  vm.selectedHouse = '';

  vm.enteredHouseCode = '';

  vm.getHouses = function() {
    vm.houseService.getHouses().then(function(response) {
      vm.houses = response.data;
    });
  }

  vm.getHouses();
  console.log('houses in controller', vm.houses);

  vm.selectHouse = function(selectedHouse) {
    console.log('in selectHouse', selectedHouse);
    // This function will then either ng-show an input field for house code and "join house" button, or create an alert to enter the code
    swal("House code for " + selectedHouse + ":", {
      content: "input", 
    }).then(function(houseCode) {
      swal('You typed: ' + houseCode);
    });
  }

  vm.joinHouse = function(enteredHouseCode, selectedHouse) {
    console.log('in join house', enteredHouseCode, ',', selectedHouse);
    vm.houseService.addMember(enteredHouseCode, selectedHouse).then(function(response) {
      if (response.status === 401) {
        swal('uh oh!');
      }
      console.log('response from server', response.status);
    })

    //Logic of whether the house codes match should be on the server side
    //So, I want a post route that only works if the code the person enters matches houseCode from the house table
    //Specifically, if the code matches the houseCode, where the houseName matches
  }




});
