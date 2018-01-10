myApp.controller('DialogController', function ($routeParams, $mdDialog, HouseService, UserService, TransactionService) {
    console.log('DialogController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.transactionService = TransactionService;

    //ADD HOUSE DIALOG
    
    //Numbers for close out dates on addHouse form
    vm.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // Add house route
    vm.addHouse = function (newHouse) {
        console.log('adding house');
        vm.houseService.addHouse(newHouse).then(function () {
            $mdDialog.hide()
        }).then(function () {
            vm.houseService.getHouses();
        })
    }
    //END ADD HOUSE DIALOG

    //ADD TRANSACTION DIALOG
    vm.categories = [];
    vm.houseId = $routeParams.id;
    vm.currentHouse = {};
    vm.myDate = new Date();

    // Get data for the current house that we are in. Specifically, we want access to the house's close out date.
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
            // Then, get the minimum and maximum dates to display in the datepicker, using the house's close out date.
        }).then(function () {
            vm.minDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth(),
                -vm.currentHouse.closeOutDate
            );

            vm.maxDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth() + 1,
                -vm.currentHouse.closeOutDate - 1
            );
        })
    }

    vm.getCurrentHouse(vm.houseId);


    // Cancels a dialog box
    vm.cancel = function () {
        console.log('canceled dialog');
        $mdDialog.cancel();
    };


    //Filestack API: When user clicks 'Upload photo of receipt', use FileStack API to upload image from local file system
    vm.apikey = 'AuSmv6aEsT2acrLuuw0HRz';
    vm.filestackClient = filestack.init(vm.apikey);

    vm.response = { img: '' };

    vm.openPicker = function () {
        vm.filestackClient.pick({
            fromSources: ["local_file_system", "dropbox", "url", "imagesearch"],
            accept: ["image/*"]
        }).then(function (response) {
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

    //Get all categories that a user can choose from
    vm.getCategories = function () {
        vm.transactionService.getCategories().then(function (response) {
            vm.categories = response.data;
            console.log('categories:', vm.categories);
        })
    }

    vm.getCategories();

    //Add transaction route
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


    //END ADD TRANSACTION DIALOG

});
