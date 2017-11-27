myApp.controller('TransactionController', function($routeParams, UserService, TransactionService, HouseService) {
    console.log('TransactionController created');
    var vm = this;
    vm.userService = UserService;
    vm.transactionService = TransactionService;
    vm.houseService = HouseService;

    vm.transactionList = '';
    vm.currentHouse = {
        id: vm.houseService.currentHouse.id,
        name: vm.houseService.currentHouse.name,
        rent: vm.houseService.currentHouse.rent,
        closeOutDate: vm.houseService.currentHouse.closeOutDate
    }

    vm.getTransactions = function() {
        vm.transactionService.getTransactions().then(function(response) {
            vm.transactionList = response.data;
            console.log('transactions in controller', vm.transactionList);
        })
        // }).then(function() {
        //     vm.house.amount = vm.transactionService.totalAmount(vm.houseService.houseId.id, vm.transactionList);
        //     console.log('amount', vm.house.amount);
        // })
    }


    vm.getTransactions();
  
  
    
  });