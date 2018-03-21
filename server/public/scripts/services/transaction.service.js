myApp.service('TransactionService', function($http, $routeParams, $location, UserService){
    console.log('TransactionService Loaded');
    var self = this;
    self.transactionList = {
        trans: []
    }

    var houseId = $routeParams.id;
    console.log('house id from route params', houseId);

    //POST transaction to DB
    self.addTransaction = function(newTransaction){
        var transactionToSend = {
            userId: UserService.userObject.userId,
            houseId: houseId,
            date: newTransaction.date,
            amount: newTransaction.amount,
            categorfy: newTransaction.category,
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
    
    //GET transactions for the current month
    self.getTransactionsForMonth = function(houseId, minDate, maxDate) {
        return $http.get('/transaction/' + houseId + '/' + minDate + '/' + maxDate).then(function(response) {
            console.log('got transactions', response);
            self.transactionList.trans = response.data;
            return response;
        })
    }

    //GET categories route
    self.getCategories = function () {
        return $http.get('/category').then(function (response) {
            console.log('got categories', response);
            self.transactionList.trans = response.data;
            return response;
        })
    }

    //PUT transaction route
    self.editTransaction = function(transaction) {
        console.log('sending transaction', transaction);
        return $http.put('/transaction/' + transaction.id, transaction).then(function(response) {
            console.log('new transaction update', response)
            return response;
        }).catch(function(err) {
            console.log('transaction update didn\'t work', err);
        })
    }

    //DELETE transaction route
    self.deleteTransaction = function(transactionId) {
        return $http.delete('/transaction/' + transactionId).then(function(response) {
            console.log('transaction deleted!', response)
            return response;
        }).catch(function(err) {
            console.log('transaction delete didn\'t work', err);
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