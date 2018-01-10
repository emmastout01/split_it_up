myApp.controller('AboutController', function (MemberService, $location, $mdDialog, UserService, HouseService, $routeParams) {
    console.log('AboutController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.houseService = HouseService;
    vm.memberService = MemberService;
  
    vm.message = ''
    vm.houses = '';
    vm.userHouses = '';
    vm.selectedHouse = '';
    vm.enteredHouseCode = '';
  
    vm.houseId = $routeParams.id;

    vm.getHouseId = function(userHouse) {
      console.log('just clicked on ', userHouse.id);
      vm.houseService.getHouseId(userHouse);
    }

    vm.currentHouse = {
        id: vm.houseService.currentHouse.id,
        name: vm.houseService.currentHouse.name,
        rent: vm.houseService.currentHouse.rent,
        closeOutDate: vm.houseService.currentHouse.closeOutDate
    }
       
      vm.getCurrentHouse = function(houseId) {
        vm.houseService.getCurrentHouse(houseId).then(function(response) {
          vm.currentHouse = {
            id: response.data[0].id,
            name: response.data[0].houseName,
            rent: response.data[0].totalRent,
            closeOutDate: response.data[0].closeOutDate
        }
        }) 
      }
    
      vm.getCurrentHouse(vm.houseId);
  
   
  
  
  }); //End AboutController