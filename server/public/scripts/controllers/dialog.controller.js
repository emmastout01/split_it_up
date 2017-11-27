myApp.controller('DialogController', function($mdDialog, HouseService, UserService, TransactionService) {
    console.log('DialogController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.transactionService = TransactionService;

    // House dialog on user home page
    
    //Add house on submit click
    vm.addHouse = function (newHouse) {
      console.log('adding house');
      vm.houseService.addHouse(newHouse).then(function() {
        $mdDialog.hide()
        }).then(function() {
          vm.houseService.getHouses();
      })
    }

    //Numbers for close out dates on addHouse form
    vm.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    //Add transaction dialog on add transaction page
    vm.addTransaction = function (newTransaction) {
      console.log('adding transaction');
      vm.transactionService.addTransaction(newTransaction).then(function() {
        $mdDialog.hide()
        })
    }

    //Date Picker

    //Stand in numbers for date picker : will be changed to the user-entered close-out info
    var number = 2; 
    var secondNumber = 3;

    vm.myDate = new Date();
    
      vm.minDate = new Date(
       vm.myDate.getFullYear(),
       vm.myDate.getMonth(), 
       -number
      );
    
      vm.maxDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth() +1,
        -secondNumber
      );


    // Cancels a dialog box
    vm.cancel = function () {
      $mdDialog.cancel();
    };


     


   

  });
  