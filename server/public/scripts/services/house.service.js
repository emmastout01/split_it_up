myApp.service('HouseService', function($http, $location, UserService){
    console.log('HouseService Loaded');
    var self = this;

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