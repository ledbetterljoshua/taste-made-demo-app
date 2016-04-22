// public/js/controllers/NerdCtrl.js
angular.module('VideoCtrl', []).controller('VideoController', function($scope, $http, contentful, $routeParams, $sce) {
	$scope.cssClass = 'view3';

	var getVideo = function() {
		contentful.entries("content_type=video&fields.slug="+$routeParams.video)
			.then(
			// Success handler
			function(response){
			  	$scope.videoSrc = response.data.items[0].fields.landscapeAsset.fields.awsRenditions;
			  	console.log(response.data.items[0]);
			  	$scope.video = response.data.items[0];

			  	$scope.videoData = {};
				$scope.videoData.config = {
					sources: [
						{src: $sce.trustAsResourceUrl($scope.videoSrc[0].src), type: "video/mp4"},
						{src: $sce.trustAsResourceUrl($scope.videoSrc[1].src), type: "video/webm"},
						{src: $sce.trustAsResourceUrl($scope.videoSrc[2].src), type: "video/ogg"}
					],
					autoPlay: true,
					theme: "../../js/videogular-themes-default/videogular.css",
					plugins: {
						poster: response.data.items[0].fields.landscapeAsset.fields.awsStill
					}
				};

				contentful.entries("content_type=video&fields.author.sys.id="+$scope.video.fields.author.sys.id)
					.then(
					function(response){
					  console.log(response.data);
					  $scope.recipes = response.data;
					  console.log("$scope.recipes!!!!!!!")
					  console.log($scope.recipes)
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

  	$scope.goTo = function(url) {
  		window.location.href = "/#/v/"+url;
  	}
  	$scope.save_content = function(slug) {
  	  console.log($scope.video)
	  $http.post('/api/saved', $scope.video).success(function(response){
			console.log('video saved')
			console.log($scope.video)
			console.log(response)
			//$scope.post = {url: parenturl}
		}).error(function(error) {
			console.log(error)
		});
	}
	getVideo();

});






