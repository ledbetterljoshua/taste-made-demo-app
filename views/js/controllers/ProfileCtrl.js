// public/js/controllers/NerdCtrl.js
angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, contentful, $routeParams) {
	$scope.cssClass = 'view3';
    //$scope.tagline = 'Nothing beats a pocket protector!';

	var getUserVideos = function() {
		contentful.entries("content_type=author&fields.slug="+$routeParams.user)
			.then(
			// Success handler
			function(response){
			  $scope.userData = response.data.items[0];
			  var userData = response.data.items[0];
			  console.log(JSON.stringify(userData))

			  contentful.entries("content_type=video&fields.author.sys.id="+userData.sys.id)
					.then(
					// Success handler
					function(response){
					  console.log(response.data);
					  $scope.userVideos = response.data.items;
					},

					// Error handler
					function(response){
					  return response.status;
					  console.log('Oops, error ' + response.status);
					}
				);

			},

			// Error handler
			function(response){
			  return response.status;
			  console.log('Oops, error ' + response.status);
			}
		);
	}
	getUserVideos();
    //&content_type=author&fields.slug=marcus-meacham

    //get all videos for a user:
    //&content_type=video&fields.author.sys.id=1PTMbRHWqYgcKUCYEacmWi

});






