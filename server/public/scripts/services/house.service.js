myApp.service('HouseService', function($http, $location){
    console.log('HouseService Loaded');
    var self = this;

    self.addHouse = function(newHouse){
        var houseToSend = {
            houseName: newHouse.houseName,
            houseCode: newHouse.houseCode,
            totalRent: newHouse.totalRent,
            closeOutDate: newHouse.closeOutDate
        }
        $http.post('/addHouse', houseToSend).then(function(response) {
            console.log('new house post', response)
            return response;
        }).catch(function(err) {
            console.log('house post didn\'t work', err);
        })
    }

});