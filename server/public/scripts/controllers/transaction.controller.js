myApp.controller('TransactionController', function ($routeParams, $mdDialog, UserService, TransactionService, HouseService) {
  console.log('TransactionController created');
  var vm = this;
  vm.userService = UserService;
  vm.transactionService = TransactionService;
  vm.houseService = HouseService;

  vm.houseId = $routeParams.id
  vm.transactions = '';
  vm.myDate = new Date;
  vm.minDateNumber = '';
  vm.maxDateNumber = '';

  vm.thisMonth = moment().format('MMMM');

  vm.currentHouse = {
    id: vm.houseService.currentHouse.id,
    name: vm.houseService.currentHouse.name,
    rent: vm.houseService.currentHouse.rent,
    closeOutDate: vm.houseService.currentHouse.closeOutDate
  }

    //Get transactions for the house for the month. (called below within vm.getCurrentHouse(houseId))
    vm.getTransactionsForMonth = function (houseId, minDate, maxDate) {
      vm.transactionService.getTransactionsForMonth(houseId, minDate, maxDate).then(function (response) {
        vm.transactions = response.data;
        for (var i = 0; i < vm.transactions.length; i++) {
          vm.transactions[i].date = moment(vm.transactions[i].date).format('L')
        }
        console.log('transactions in controller', vm.transactions);
      })
    }

  //Get the current house on page load. This gives us access to the chosen close-out date for the house. With that information, we then get transactions for the month between the close-out date for last month and the close-out date for the current month.
  vm.getCurrentHouse = function (houseId) {
    vm.houseService.getCurrentHouse(houseId).then(function (response) {
      console.log('we are in house', response.data[0]);
      vm.currentHouse = {
        id: response.data[0].id,
        name: response.data[0].houseName,
        rent: response.data[0].totalRent,
        closeOutDate: response.data[0].closeOutDate
      }
    })
    //Grab the close out date from the house that we are in and assign minDate and maxDate based on the close out date
    .then(function() {
      vm.minDate = new Date(
          vm.myDate.getFullYear(),
          vm.myDate.getMonth(),
          -vm.minDateNumber
      );
      vm.minDate = moment(vm.minDate).format('YYYY-MM-DD');
      
      vm.maxDate = new Date(
          vm.myDate.getFullYear(),
          vm.myDate.getMonth() +1,
          -vm.maxDateNumber
      );
      vm.maxDate = moment(vm.maxDate).format('YYYY-MM-DD');
  }) 
  //Then, using the minDate and maxDate, get transactions for the range between the min and the max date
  .then(function() {
    vm.getTransactionsForMonth(vm.houseId, vm.minDate, vm.maxDate);
  })
  }

  vm.getCurrentHouse(vm.houseId);






  // Edit transactions: This opens the edit transactions dialog, controlled by editTransaction.controller.js. We're sending the current transaction as locals.
  vm.editTransaction = function (ev, transaction) {
      $mdDialog.show({
        templateUrl: '/views/dialogs/dialog.editTransaction.html',
        controller: 'EditDialogController as ec',
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: { transaction: transaction }
      }).then(function() {
        console.log('finished updating!')
        vm.getTransactionsForMonth(vm.houseId, vm.minDate, vm.maxDate);
      });
};


  //Delete transactions
  vm.deleteTransaction = function (transactionId) {
    console.log('delete');
    vm.transactionService.deleteTransaction(transactionId).then(function (response) {
      vm.getTransactionsForMonth(vm.houseId, vm.minDate, vm.maxDate);
    })
  }

  //If there is a receipt to show, show the "view receipt" button. Otherwise do not show the button.
  vm.showViewReceipt = function (transaction) {
    if (transaction.viewReceipt) {
      return true;
    }
    return false;
  }

  //When "view receipt" button is clicked, open a dialog with a photo of the receipt. 
  vm.thisTransactionPhoto = {
    photo: 'empty'
  };

  vm.viewReceipt = function (ev, transaction) {
    vm.thisTransactionPhoto.photo = transaction.viewReceipt;
    $mdDialog.show({
      templateUrl: '/views/dialogs/dialog.viewReceipt.html',
      controller: 'ReceiptDialogController as dc',
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: { photo: vm.thisTransactionPhoto.photo }
    }).then(function() {
      console.log('here');
    })
  };

});