myApp.controller('HouseController', function (TransactionService, MemberService, HouseService, $mdDialog, $routeParams) {
  console.log('HouseController created');
  var vm = this;
  vm.houseService = HouseService;
  vm.memberService = MemberService;
  vm.transactionService = TransactionService;

  vm.houseId = $routeParams.id;
  vm.currentHouse = '';
  vm.members = '';
  vm.transactionsForMonth = [];
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

  //Get the total food costs, utilities costs, and 'other' costs for the month, and add to monthly house rent to get total monthly cost.
  //Called below within vm.getCurrentHouse(houseId)
  vm.getTransactionsForMonth = function (houseId, minDate, maxDate) {
    vm.transactionService.getTransactionsForMonth(houseId, minDate, maxDate).then(function (response) {
      vm.transactionsForMonth = response.data;
      vm.getUtilCost(vm.transactionsForMonth);
      vm.getFoodCost(vm.transactionsForMonth);
      vm.getOtherCost(vm.transactionsForMonth);
      vm.getMembers(vm.houseId);
    }).then(function () {
      vm.totalCost = vm.utilCost + vm.foodCost + vm.otherCost + vm.currentHouse.rent;
      console.log('vm. members', vm.members.length);
      
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

  //Get 'utility' costs for house for month
  vm.getUtilCost = function (transactions) {
    var result = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].category_id === 2 || 3 || 4 || 5 || 6) {
        console.log('getting this util cost', transactions[i].category_id);
        result += parseFloat(transactions[i].amount);
      }
    }
    vm.utilCost = result;
  }

  //Get 'food' costs for house for month
  vm.getFoodCost = function (transactions) {
    var result = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].category_id === 1) {
        result += parseFloat(transactions[i].amount);
      }
    }
    vm.foodCost = result;
  }

  //Get 'other' costs for house for month
  vm.getOtherCost = function (transactions) {
    var result = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].category_id === 7) {
        result += parseFloat(transactions[i].amount);
      }
    }
    vm.otherCost = result;
  }

  //Get members of the house. Set vm.costPerPerson = total cost / total number of house members.
  vm.getMembers = function (houseId) {
    vm.memberService.getMembers(houseId).then(function (response) {
      vm.members = response.data;
      vm.costPerPerson = vm.totalCost / vm.members.length;
      findAlreadyPaid(vm.members);
      findStillOwes(vm.members);
      console.log('vm.members', vm.members);
    })
  }

  //Determine what each user has already paid this month: Add up all transactions between last month's close out date and this month's close out date for each user.
  function findAlreadyPaid(members) {
    var transactions = vm.transactionsForMonth;
    console.log('transactions', transactions);
    for (var i = 0; i < members.length; i++) {
      members[i].alreadyPaid = 0;
      for (var j = 0; j < transactions.length; j++) {
        if (transactions[j].user_id == members[i].user_id && transactions[j].house_id == vm.houseId) {
          members[i].alreadyPaid += parseFloat(transactions[j].amount);
        }
      }
    }
  }

  //Grab the total cost per person , and subtract what this member has already paid. This will give us what the member still owes this month.
  function findStillOwes(members) {
    for (var i = 0; i < members.length; i++) {
      members[i].stillOwes = 0;
      members[i].stillOwes = vm.costPerPerson - members[i].alreadyPaid
      }
    }

}); //End controller
