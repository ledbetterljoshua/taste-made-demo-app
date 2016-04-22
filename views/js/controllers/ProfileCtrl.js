// public/js/controllers/NerdCtrl.js
angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, contentful, $routeParams, $http, $mdToast) {
	$scope.cssClass = 'view3';
    //$scope.tagline = 'Nothing beats a pocket protector!';

	var getUserVideos = function() {
		contentful.entries("content_type=author&fields.slug="+$routeParams.user)
			.then(
			// Success handler
			function(response){
			  $scope.userData = response.data.items[0];
			  var userData = response.data.items[0];
			  //console.log(JSON.stringify(userData))

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
	$scope.alreadyFollowed = false;
	$scope.ifFollowed = function() {
		$http.get('/api/following').success(function(response){
			var userSlug = $routeParams.user;
			console.log("following");
			console.log(response); 

			for (i = 0; i < response.length; i++) {
				if(response[i].following[0].fields.slug == userSlug) {
					$scope.alreadyFollowed = true;
					console.log(response[i].following[0].fields.slug)
				} 
			}
			console.log($scope.alreadyFollowed);
		}).error(function(err) {
			console.log(err)
		});
	}
	$scope.ifFollowed();
	$scope.followUser = function(slug) {
		contentful.entries("content_type=author&fields.slug="+slug)
			.then(
			// Success handler
			function(response){
			  var userData = response.data.items[0];
			  $http.post('/api/following', userData).success(function(response){
					console.log('follow saved')
					console.log(userData)
					console.log(response)
					$scope.alreadyFollowed = true;
					$mdToast.show(
			            $mdToast.simple()
			              .textContent('Followed!')
			              .position("top right")
			              .hideDelay(3000)
			          );
					//$scope.post = {url: parenturl}
				}).error(function(){
					$mdToast.show(
			        $mdToast.simple()
			          .textContent('You need to log in!!')
			          .position("top right")
			          .hideDelay(3000)
			      );
			      return false;
				});
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






