myApp.controller('DialogController', function ($mdDialog, HouseService, UserService, TransactionService, photo) {
    console.log('DialogController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.transactionService = TransactionService;

    vm.categories = [];

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

    vm.photo = photo;

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
        vm.myDate.getMonth() + 1,
        -secondNumber
    );


    // Cancels a dialog box
    vm.cancel = function () {
        $mdDialog.cancel();
    };







});
