myApp.controller('TransactionController', function($routeParams, UserService, TransactionService, HouseService) {
    console.log('TransactionController created');
    var vm = this;
    vm.userService = UserService;
    vm.transactionService = TransactionService;
    vm.houseService = HouseService;
    
    vm.houseId = $routeParams.id
    vm.transactions = '';

    //Get the current house on page load, so we have access to the data from that house (house name, id, etc.)
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

    
    //Get transactions for the house
    vm.getTransactions = function(houseId) {
        vm.transactionService.getTransactions(houseId).then(function(response) {
            vm.transactions = response.data;
            for (var i=0; i < vm.transactions.length; i++) {
              vm.transactions[i].date = moment(vm.transactions[i].date).format('MMM Do')
              console.log(vm.transactions[i].date);
            }
            console.log('transactions in controller', vm.transactions);
        })
    }

    vm.getTransactions(vm.houseId);
  
  //Angular table for transactions
    vm.selected = [];

    vm.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    
});