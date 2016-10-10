angular.module('starter.controllers', [])

 .controller('loginCtrl', ['$scope', 'loginFactory', function($scope, loginFactory) {

  // FACEBOOK LOGIN FUNCTION
  $scope.FbLogin = function(){
    FB.login(function(response) {
        if (response.authResponse) {
          FB.api('/me?fields=first_name,picture,last_name', function(response) {               
            console.log('Good to see you, ' + response.first_name + '.');
            var data = $.param({
                    id: response.id,
                    firstname: response.first_name,
                    lastname: response.last_name,
                    email: "",
                    photo_url: response.picture.data.url,
                    provider:"facebook"
                  });
              
              loginFactory.userLogin(data)
                .success(function (data, status, headers, config) {
                  $scope.name = response.first_name + " " + response.last_name;
                  $scope.photo = response.picture.data.url;
                    $location.path("#/home");
                    })
                    .error(function (data, status, header, config) {
                        $scope.ResponseDetails = "Data: " + data +
                          "<hr />status: " + status +
                          "<hr />headers: " + header +
                          "<hr />config: " + config;
                    });
        });
      }
    });
  }

 }]) 

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
