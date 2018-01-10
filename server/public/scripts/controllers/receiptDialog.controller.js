myApp.controller('ReceiptDialogController', function ($mdDialog, HouseService, UserService, TransactionService, photo) {
    console.log('ReceiptDialogController created');
    var vm = this;
    vm.houseService = HouseService;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.transactionService = TransactionService;

    //Filestack API: When user clicks 'Upload photo of receipt' in Add Transaction Dialog, use FileStack API to upload image from local file system
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
      swal('Receipt added!', 'Your receipt has been added.', 'success');
    } 
    //End filestack


    // House dialog on user home page
    vm.photo = photo;

    // Cancels a dialog box
    vm.cancel = function () {
        $mdDialog.cancel();
    };







});
