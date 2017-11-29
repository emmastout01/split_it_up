myApp.controller('EditDialogController', function ($routeParams, $mdDialog, HouseService, TransactionService, transaction) {
    console.log('EditDialogController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.transactionService = TransactionService;

    vm.categories = [];
    vm.myDate = new Date();

    vm.houseId = $routeParams.id;
    vm.currentHouse = {};
    vm.number = {
        number:2
    }
    vm.secondNumber = {
        number: 2
    }

    console.log('transaction date', transaction.date);

    vm.transaction = {
        id: parseInt(transaction.id),
        user_id: transaction.user_id,
        house_id: transaction.house_id,
        amount: parseFloat(transaction.amount),
        date: moment(transaction.date).format('L'),
        category_id: transaction.category_id,
        notes: transaction.notes,
        viewReceipt: transaction.viewReceipt
    }

    

    console.log('transaction', vm.transaction);
       
      vm.getCurrentHouse = function(houseId) {
        vm.houseService.getCurrentHouse(houseId).then(function(response) {
          vm.currentHouse = {
            id: response.data[0].id,
            name: response.data[0].houseName,
            rent: response.data[0].totalRent,
            closeOutDate: response.data[0].closeOutDate
        }
        return vm.currentHouse;
        }).then(function() {
            vm.number.number = vm.currentHouse.closeOutDate;
            vm.secondNumber.number = vm.currentHouse.closeOutDate - 1;
            vm.minDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth(),
                -vm.number.number
            );
            vm.maxDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth() + 1,
                -vm.secondNumber.number
            );
        }) 
    }

    vm.getCurrentHouse(vm.houseId);
    
        // Cancels a dialog box
        vm.cancel = function () {
            $mdDialog.cancel();
        };
    

///When I come back: need to be able to access the close out date for the current house in order to change the calendar on add transaction dialog

    //Filestack for add transaction dialog 
    vm.apikey = 'AuSmv6aEsT2acrLuuw0HRz';
    vm.filestackClient = filestack.init(vm.apikey);

    vm.response = {img:''}; 

    vm.openPicker = function() {
      vm.filestackClient.pick({
        fromSources:["local_file_system","dropbox", "url", "imagesearch"],
        accept:["image/*"]
      }).then(function(response) {
        // declare this function to handle response
        handleFilestack(response);
      });
    };
  
    function handleFilestack(response) {
      console.log(response.filesUploaded[0]);
      vm.response.img = response.filesUploaded[0].url;
      console.log(vm.response);
      swal('woohoo!', 'we\'ve got your image!', 'success');
    }


    // House dialog on user home page

    //Add house on submit click

    //Get request for all categories
    vm.getCategories = function() {
        vm.transactionService.getCategories().then(function (response) {
            vm.categories = response.data;
            console.log('categories:', vm.categories);
        })
    }

    vm.getCategories();

    vm.editTransaction = function(transaction, houseId) {
        console.log('transaction being edited', transaction);
        vm.transactionService.editTransaction(transaction).then(function(response) {
            vm.transactionService.getTransactions(houseId);
        })
    }

});
