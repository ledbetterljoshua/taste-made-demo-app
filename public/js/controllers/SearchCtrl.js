// public/js/controllers/NerdCtrl.js
angular.module('SearchCtrl', []).controller('SearchController', function($scope, contentful) {
	$scope.cssClass = 'view2';

	$scope.searchAll = function(query){
		$scope.SearchResponse = {};
		contentful.entries("query="+query+"&limit=10")
        .then(
	        // Success handler
	        function(response){
	          $scope.SearchResponse = response.data.items;
	          console.log(response);
	        },
	        // Error handler
	        function(response){
	          console.log('Oops, error ' + response.status);
	        }

      	);
  	}

  	$scope.goBack = function() {
  		window.history.back()
  	}
});