myApp.service('HouseService', function($routeParams, $http, $location, UserService){
    console.log('HouseService Loaded');
    var self = this;

    self.houseId = {
        id: ''
    }

    self.getHouseId = function(userHouse) {
        self.houseId.id = userHouse.id;
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
            console.log('new house post', response)
            self.getHouses();
            return response;
        }).catch(function(err) {
            console.log('house post didn\'t work', err);
        })
    }

    self.getUserHouses = function() {
        return $http.get('/userHouse').then(function(response) {
            console.log('got user houses', response);
            return response;
        }).catch(function(err) {
            console.log('get user houses failed', err);
        })
    }

    self.getHouseId = function(userHouse) {
        self.houseId.id = userHouse.id;
        console.log('house service house id', self.houseId.id);
    }

    self.removeHouse = function(userHouse) {
        return $http.delete('/member/' + userHouse).then(function(response) {
            console.log('deleted house', response);
            return response;
        })
    }

    self.getHouses = function() {
        return $http.get('/house').then(function(response) {
            console.log('got houses', response);
            return response;
        })
    }

    self.addMember = function(newMemberCode, selectedHouse){
        var memberToSend = {
           code: newMemberCode,
           selectedHouse: selectedHouse,
           userId: UserService.userObject.userId
        }
        console.log(memberToSend);
        return $http.post('/member', memberToSend).then(function(response) {
            console.log('new member post', response)
            self.getHouses();
            return response;
        }).catch(function(err) {
            if(err.status === 401) {
            //    alert('The house code you entered is incorrect. Please try again.');
            }
            return err;
            // console.log('problem with post route', err);
        })
    }
});