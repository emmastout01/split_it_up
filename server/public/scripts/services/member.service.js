myApp.service('MemberService', function($routeParams, $http, $location, UserService){
    var self = this;

    self.addMember = function(newMemberCode, selectedHouse){
        var memberToSend = {
           code: newMemberCode,
           selectedHouse: selectedHouse,
           userId: UserService.userObject.userId
        }
        console.log('member to send', memberToSend, memberToSend.userId);
        return $http.post('/member', memberToSend).then(function(response) {
            return response;
        }).catch(function(err) {
            return err;
            console.log('problem with post route', err);
        })
    }

    self.getMembers = function(houseId) {
        return $http.get('/member/' + houseId).then(function(response) {
            return response;
        }).catch(function(err) {
            console.log('error', err);
            return err;
        })
    }

    self.removeHouse = function(userHouse) {
        return $http.delete('/member/' + userHouse).then(function(response) {
            return response;
        })
    }
});

   