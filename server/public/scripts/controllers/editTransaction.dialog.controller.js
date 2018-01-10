myApp.controller('EditDialogController', function (UserService, $routeParams, $mdDialog, HouseService, TransactionService, transaction) {
    console.log('EditDialogController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.transactionService = TransactionService;
    vm.userObject = UserService.userObject;

    vm.categories = [];
    vm.myDate = new Date();

    vm.houseId = $routeParams.id;
    vm.currentHouse = {};
    
    // This is the transaction that the user clicked on to edit. We're pulling information from 'transaction', which was sent as locals in the md-dialog function in the transaction controller.
    vm.transaction = {
        id: parseInt(transaction.id),
        user_id: transaction.user_id,
        house_id: transaction.house_id,
        amount: parseFloat(transaction.amount),
        date: moment(transaction.date).format('L'),
        category_id: transaction.category_id, 
        notes: transaction.notes,
        viewReceipt: transaction.viewReceipt,
        categoryName: transaction.categoryName
    }

// Get data for the current house that we are in. Specifically, we want access to the house's close out date.
      vm.getCurrentHouse = function(houseId) {
        vm.houseService.getCurrentHouse(houseId).then(function(response) {
          vm.currentHouse = {
            id: response.data[0].id,
            name: response.data[0].houseName,
            rent: response.data[0].totalRent,
            closeOutDate: response.data[0].closeOutDate
        }
        return vm.currentHouse;
        // Then, get the minimum and maximum dates to display in the datepicker, using the house's close out date.
        }).then(function() {
            vm.minDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth(),
                -vm.currentHouse.closeOutDate
            );
            vm.maxDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth() + 1,
                -(vm.currentHouse.closeOutDate - 1)
            );
        }) 
    }

    vm.getCurrentHouse(vm.houseId);
    
        // Cancels a dialog box
        vm.cancel = function () {
            $mdDialog.cancel();
        };
    

   //Filestack API: When user clicks 'Upload photo of receipt', use FileStack API to upload image from local file system
    vm.apikey = 'AuSmv6aEsT2acrLuuw0HRz';
    vm.filestackClient = filestack.init(vm.apikey);

    vm.response = {img:''}; 

    vm.openPicker = function() {
      vm.filestackClient.pick({
        fromSources:["local_file_system","dropbox", "url", "imagesearch"],
        accept:["image/*"]
      }).then(function(response) {
        handleFilestack(response);
      });
    };
  
    function handleFilestack(response) {
      console.log(response.filesUploaded[0]);
      vm.response.img = response.filesUploaded[0].url;
      console.log(vm.response);
      swal('woohoo!', 'we\'ve got your image!', 'success');
    }


    //Get all categories that a user can choose from
    vm.getCategories = function() {
        console.log('getting categories');
        vm.transactionService.getCategories().then(function (response) {
            vm.categories = response.data;
            console.log('categories:', vm.categories);
        })
    }

    vm.getCategories();

    //Edit transaction route
    vm.editTransaction = function(transaction, houseId) {
        vm.transactionService.editTransaction(transaction).then(function() {
            $mdDialog.hide()
        })
    }

});
 