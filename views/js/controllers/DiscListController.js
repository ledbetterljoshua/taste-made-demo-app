// public/js/controllers/NerdCtrl.js
angular.module('DiscListCtrl', []).controller('DiscListController', function($scope, contentful, $routeParams, $sce) {
	$scope.cssClass = 'view3';

	var getVideo = function() {
		contentful.entries("content_type=video&fields.series.sys.id="+$routeParams.slug)
			.then(
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

  	$scope.goTo = function(url) {
  		window.location.href = "/#/v/"+url;
  	}
	getVideo();

});






