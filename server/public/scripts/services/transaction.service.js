myApp.service('TransactionService', function($http, $routeParams, $location, UserService){
    console.log('TransactionService Loaded');
    var self = this;
    self.transactionList = {
        trans: []
    }

    var houseId = $routeParams.id;
    console.log('house id from route params', houseId);

    self.addTransaction = function(newTransaction){
        var transactionToSend = {
            userId: UserService.userObject.userId,
            houseId: houseId,
            date: newTransaction.date,
            amount: newTransaction.amount,
            category: newTransaction.category,
            notes: newTransaction.notes,
            photo: newTransaction.photo
        }
        return $http.post('/transaction', transactionToSend).then(function(response) {
            console.log('new transaction post', response)
            // self.getHouses();
            return response;
        }).catch(function(err) {
            console.log('transaction post didn\'t work', err);
        })
    }
    

    self.getTransactions = function() {
        return $http.get('/transaction').then(function(response) {
            console.log('got transactions', response);
            self.transactionList.trans = response.data;
            return response;
        })
    }
});

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