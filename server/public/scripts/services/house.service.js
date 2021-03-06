myApp.service('HouseService', function($routeParams, $http, $location, UserService){
    var self = this;

    self.currentHouse = {
        id: '',
        name: '',
        rent: '',
        closeOutDate: ''
    }


    self.getCurrentHouse = function(houseId) {
        return $http.get('/currentHouse/' + houseId).then(function(response) {
            return response;
        }).catch(function(err) {
            console.log('get current house failed', err);
        })
    }

    self.editHouse = function(house) {
        console.log('editing house', house);
        return $http.put('/house/' + house.id, house).then(function(response) {
            return response;
        }).catch(function(err) {
            console.log('edit house failed', err);
        })
    }
    
    self.getHouseId = function(userHouse) {
        self.currentHouse.id = userHouse.id;
        self.currentHouse.name = userHouse.houseName;
        self.currentHouse.rent = userHouse.totalRent;
        self.currentHouse.closeOutDate = userHouse.closeOutDate;
    }

    console.log('route params', $routeParams.id);

    self.addHouse = function(newHouse){
        var houseToSend = {
            houseName: newHouse.houseName,
            houseCode: newHouse.houseCode,
            totalRent: newHouse.totalRent,
            closeOutDate: newHouse.closeOutDate
        }
        return $http.post('/house', houseToSend).then(function(response) {
            // self.getHouses();
            return response;
        }).catch(function(err) {
            console.log('house post didn\'t work', err);
        })
    }

    self.getUserHouses = function() {
        return $http.get('/userHouse').then(function(response) {
            return response;
        }).catch(function(err) {
            console.log('get user houses failed', err);
        })
    }

    self.getHouses = function() {
        return $http.get('/house').then(function(response) {
            return response;
        })
    }
});