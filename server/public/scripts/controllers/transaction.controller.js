myApp.controller('TransactionController', function($routeParams, UserService, TransactionService, HouseService) {
    console.log('TransactionController created');
    var vm = this;
    vm.userService = UserService;
    vm.transactionService = TransactionService;
    vm.houseService = HouseService;
    
    vm.houseId = $routeParams.id
    vm.transactionList = '';
    vm.currentHouse = {
        id: vm.houseService.currentHouse.id,
        name: vm.houseService.currentHouse.name,
        rent: vm.houseService.currentHouse.rent,
        closeOutDate: vm.houseService.currentHouse.closeOutDate
    }
       
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
    

    vm.getTransactions = function(houseId) {
        vm.transactionService.getTransactions(houseId).then(function(response) {
            vm.transactionList = response.data;
            console.log('transactions in controller', vm.transactionList);
        })
    }

    vm.getTransactions(vm.houseId);
  
  
    
  });