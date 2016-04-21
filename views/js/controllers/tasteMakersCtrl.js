// public/js/controllers/NerdCtrl.js
angular.module('TasteMakersCtrl', []).controller('TasteMakersController', function($scope, contentful) {
	$scope.cssClass = 'view2';

	$scope.getAuthors = function() {
	    contentful.entries("content_type=author&limit=200&skip=15")
        .then(
        // Success handler
        function(response){
          $scope.authors = response.data;
          console.log(response);
        },

        // Error handler
        function(response){
          return response.status;
          console.log('Oops, error ' + response.status);
        }
      );
	}
	$scope.goTo = function(url) {
  		window.location.href = "/#/profile/"+url;
  		console.log(url	)
  	}
	$scope.getAuthors();
});