myApp.controller('DialogController', function ($routeParams, $mdDialog, HouseService, UserService, TransactionService) {
    console.log('DialogController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.transactionService = TransactionService;

    vm.categories = [];

    vm.houseId = $routeParams.id;
    vm.currentHouse = {};

    vm.closeOutDate; 

    vm.number = {
        number:2
    }
    vm.secondNumber = {
        number: 2
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
        return vm.currentHouse;
        }).then(function() {
            console.log('close out date in dc', vm.currentHouse);
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


    vm.myDate = new Date();
    
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


    vm.addHouse = function (newHouse) {
        console.log('adding house');
        vm.houseService.addHouse(newHouse).then(function () {
            $mdDialog.hide()
        }).then(function () {
            vm.houseService.getHouses();
        })
    }

    //Numbers for close out dates on addHouse form
    vm.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    //Add transaction dialog on add transaction page
    vm.addTransaction = function (newTransaction) {
        var transactionToAdd = {
            date: newTransaction.date,
            amount: newTransaction.amount,
            category: newTransaction.category,
            notes: newTransaction.notes,
            photo: vm.response.img
        }
        console.log('adding transaction');
        vm.transactionService.addTransaction(transactionToAdd).then(function () {
            $mdDialog.hide()
        })
    }

    //Get request for all categories
    vm.getCategories = function() {
        vm.transactionService.getCategories().then(function (response) {
            vm.categories = response.data;
            console.log('categories:', vm.categories);
        })
    }

    vm.getCategories();

    //Date Picker

    //Stand in numbers for date picker : will be changed to the user-entered close-out info
   

});
