myApp.service('TransactionService', function($http, $location, UserService){
    console.log('TransactionService Loaded');
    var self = this;
    self.transactionList = {
        trans: []
    }


    // //This should run when we click 'house name' or 'view transactions'
    // self.totalAmount = function(house_id, transactionList) {
    //     //Filter removes houses where house id doesn't match
    //     return transactionList.filter(function(transaction) {
    //         return transaction.house_id === house_id;
    //         //Map makes new array of just the amounts from the transactions
    //     }).map(function(transaction) {
    //         return transaction.amount;
    //     }).reduce(function(acc, val) {
    //         return acc + val;
    //         //Reduce goes through and looks at the value, adds to accumulated;
    //     })
    //     //ALl of this should return one number: the total sum of transaction amounts for the house
    // }

    

    self.getTransactions = function() {
        return $http.get('/transaction').then(function(response) {
            console.log('got transactions', response);
            self.transactionList.trans = response.data;
            return response;
        })
    }
});