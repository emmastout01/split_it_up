myApp.controller('HouseController', function (TransactionService, MemberService, HouseService, $mdDialog, $routeParams) {
  console.log('HouseController created');
  var vm = this;
  vm.houseService = HouseService;
  vm.memberService = MemberService;
  vm.transactionService = TransactionService;

  vm.houseId = $routeParams.id;
  vm.currentHouse = '';
  vm.members = '';
  vm.transactionsForMonth = '';
  vm.minDateNumber = '';
  vm.maxDateNumber = '';
  vm.minDate = '';
  vm.myDate = new Date;

  vm.thisMonth = moment().format('MMMM');

  vm.utilCost = 0;
  vm.foodCost = 0;
  vm.otherCost = 0;
  vm.totalCost = 0;
  vm.costPerPerson = 0;

  //Function for getting transactions. Is called when current house is loaded
  vm.getTransactionsForMonth = function (houseId, minDate, maxDate) {
    vm.transactionService.getTransactionsForMonth(houseId, minDate, maxDate).then(function (response) {
      vm.transactionsForMonth = response.data;
      vm.getUtilCost(vm.transactionsForMonth);
      vm.getFoodCost(vm.transactionsForMonth);
      vm.getOtherCost(vm.transactionsForMonth);
    }).then(function () {
      vm.totalCost = vm.utilCost + vm.foodCost + vm.otherCost + vm.currentHouse.rent;
      vm.costPerPerson = vm.totalCost / vm.members.length;
    })
  }


  //Get data for the house that we are in
  vm.getCurrentHouse = function (houseId) {
    vm.houseService.getCurrentHouse(houseId).then(function (response) {
      console.log('we are in house', response.data[0]);
      vm.currentHouse = {
        id: response.data[0].id,
        name: response.data[0].houseName,
        rent: response.data[0].totalRent,
        closeOutDate: response.data[0].closeOutDate
      }
      return vm.currentHouse;
    })
      //Then, grab the close out date from the house that we are in and assign minDate and maxDate based on the close out date
      .then(function () {
        // vm.minDate = vm.currentHouse.closeOutDate;
        // vm.maxDate = vm.currentHouse.closeOutDate - 1;
        vm.minDate = new Date(
          vm.myDate.getFullYear(),
          vm.myDate.getMonth(),
          -vm.minDateNumber
        );

        vm.minDate = moment(vm.minDate).format('YYYY-MM-DD');


        vm.maxDate = new Date(
          vm.myDate.getFullYear(),
          vm.myDate.getMonth() + 1,
          -vm.maxDateNumber
        );

        vm.maxDate = moment(vm.maxDate).format('YYYY-MM-DD');
      })
      //Then, using the minDate and maxDate, get transactions for the range between the min and the max date
      .then(function () {
        vm.getTransactionsForMonth(vm.houseId, vm.minDate, vm.maxDate);
      })
  }
  vm.getCurrentHouse(vm.houseId);

  //Get utility costs for house for month
  vm.getUtilCost = function (transactions) {
    var result = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].category_id === 2 || 3 || 4 || 5 || 6) {
        result += parseFloat(transactions[i].amount);
      }
    }
    vm.utilCost = result;
  }

  //Get food costs for house for month
  vm.getFoodCost = function (transactions) {
    var result = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].category_id === 1) {
        result += parseFloat(transactions[i].amount);
      }
    }
    vm.foodCost = result;
  }

  //Get other costs for house for month
  vm.getOtherCost = function (transactions) {
    var result = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].category_id === 7) {
        result += parseFloat(transactions[i].amount);
      }
    }
    vm.otherCost = result;
  }



  //Get members of the house
  vm.getMembers = function (houseId) {
    vm.memberService.getMembers(houseId).then(function (response) {
      vm.members = response.data;
      for (var i=0; i < vm.members.length; i++) {
        vm.members[i].alreadyPaid = 0;
        vm.members[i].stillOwes = 0;
      }
      console.log('vm.members', vm.members);
    })
  }
  vm.getMembers(vm.houseId);


  //Add a transaction
  vm.addTransaction = function (ev) {
    $mdDialog.show({
      templateUrl: '/views/dialogs/dialog.addTransaction.html',
      controller: 'DialogController as dc',
      targetEvent: ev,
      clickOutsideToClose: false
    })
  };



}); //End controller
