myApp.controller('EditHouseController', function ($routeParams, $mdDialog, HouseService, UserService, TransactionService, house) {
    console.log('EditHouseController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.transactionService = TransactionService;

    // vm.houseId = $routeParams.id;
    // vm.currentHouse = {};

    //   vm.getCurrentHouse = function(houseId) {
    //     vm.houseService.getCurrentHouse(houseId).then(function(response) {
    //       console.log('we are in house', response.data[0]);
    //       vm.currentHouse = {
    //         id: response.data[0].id,
    //         name: response.data[0].houseName,
    //         rent: response.data[0].totalRent,
    //         closeOutDate: response.data[0].closeOutDate
    //     }
    //     return vm.currentHouse;
    //     })
    // }
  

    // vm.getCurrentHouse(vm.houseId);

    vm.house = {
        houseName: house.houseName,
        houseCode: house.houseCode,
        totalRent: parseInt(house.totalRent),
        closeOutDate: parseInt(house.closeOutDate)
    }


    
    console.log('house', house);

    vm.editHouse = function(houseToEdit) {
        console.log('editing');
        vm.houseService.editHouse(houseToEdit).then(function () {
            $mdDialog.hide()
        }).then(function () {
            vm.houseService.getHouses();
        })
    }
        // Cancels a dialog box
        vm.cancel = function () {
            $mdDialog.cancel();
        };
    

    //Add house on submit click


    vm.addHouse = function (newHouse) {
        console.log('editi house');
        vm.houseService.addHouse(newHouse).then(function () {
            $mdDialog.hide()
        }).then(function () {
            vm.houseService.getHouses();
        })
    }

    //Numbers for close out dates on addHouse form
    vm.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

});
