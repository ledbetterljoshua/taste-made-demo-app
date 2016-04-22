// public/js/controllers/NerdCtrl.js
angular.module('MeCtrl', []).controller('MeController', function($scope, $http, $mdToast, contentful) {
	$scope.cssClass = 'view2';

	$scope.getFollowing = function() {
	    $http.get('/api/following').success(function(response) {

      $scope.following = response;
      console.log(response);

      }).error(function(error){
        console.log(error);
      });
	}
  $scope.getSaved = function() {
      $http.get('/api/saved').success(function(response) {

        $scope.savedContent = response;
        console.log(response);

      }).error(function(error){
        console.log(error);
      });
  }
  $scope.getUserData = function() {
      $http.get('/api/user').success(function(response) {

        $scope.current_user = response;
        console.log(response);
        $scope.loggedIn = true;

      }).error(function(){
        $mdToast.show(
            $mdToast.simple()
              .textContent('You need to log in!!')
              .position("top right")
              .hideDelay(3000)
          );
          return false;
      });
  }
	$scope.goToA = function(url) {
  		window.location.href = "/#/profile/"+url;
  		console.log(url	)
  }
  $scope.goToV = function(url) {
      window.location.href = "/#/v/"+url;
      console.log(url )
  }
  $scope.getUserData();
	$scope.getFollowing();
  $scope.getSaved();
});