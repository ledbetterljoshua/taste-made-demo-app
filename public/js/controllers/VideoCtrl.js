// public/js/controllers/NerdCtrl.js
angular.module('VideoCtrl', []).controller('VideoController', function($scope, contentful, $routeParams, $sce) {
	$scope.cssClass = 'view3';
    //$scope.tagline = 'Nothing beats a pocket protector!';

 //    var getUsersVideos = function() {
	// 	contentful.entries("content_type=author&fields.slug="+$scope.video.fields.author.fields.slug)
	// 		.then(
	// 		// Success handler
	// 		function(response){
	// 		  $scope.userData = response.data.items[0];
	// 		  var userData = response.data.items[0];

	// 		  contentful.entries("content_type=video&fields.author.sys.id="+userData.sys.id)
	// 				.then(
	// 				// Success handler
	// 				function(response){
	// 				  console.log(response.data);
	// 				  $scope.userVideos = response.data.items;
	// 				},

	// 				// Error handler
	// 				function(response){
	// 				  return response.status;
	// 				  console.log('Oops, error ' + response.status);
	// 				}
	// 			);

	// 		},

	// 		// Error handler
	// 		function(response){
	// 		  return response.status;
	// 		  console.log('Oops, error ' + response.status);
	// 		}
	// 	);
	// }

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






