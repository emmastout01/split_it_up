myApp.service('MemberService', function($routeParams, $http, $location, UserService){
    console.log('MemberService Loaded');
    var self = this;

    self.addMember = function(newMemberCode, selectedHouse){
        var memberToSend = {
           code: newMemberCode,
           selectedHouse: selectedHouse,
           userId: UserService.userObject.userId
        }
        console.log('member to send', memberToSend, memberToSend.userId);
        return $http.post('/member', memberToSend).then(function(response) {
            console.log('new member post', response)
            return response;
        }).catch(function(err) {
            return err;
            console.log('problem with post route', err);
        })
    }

    self.getMembers = function(houseId) {
        return $http.get('/member/' + houseId).then(function(response) {
            console.log('got members', response)
            return response;
        }).catch(function(err) {
            console.log('error', err);
            return err;
        })
    }

    self.removeHouse = function(userHouse) {
        return $http.delete('/member/' + userHouse).then(function(response) {
            console.log('deleted house', response);
            return response;
        })
    }
});

   