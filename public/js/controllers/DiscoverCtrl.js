angular.module('DiscoverCtrl', []).controller('DiscoverController', function($scope, contentful, $routeParams, $sce) {
	var getSeries = function() {
		contentful.entries("content_type=series&limit=20")
			.then(
			// Success handler
			function(response){
			  	console.log(response.data);
			  	$scope.series = response.data;
			},

			// Error handler
			function(response){
			  return response.status;
			  console.log('Oops, error ' + response.status);
			}
		);
	}
	getSeries();
});