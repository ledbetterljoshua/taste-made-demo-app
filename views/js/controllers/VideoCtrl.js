// public/js/controllers/NerdCtrl.js
angular.module('VideoCtrl', []).controller('VideoController', function($scope, $http, contentful, $routeParams, $sce, $mdToast) {
	$scope.cssClass = 'view3';

	var info = {};
	info.url = $routeParams.video;

	$http.post("/api/pageview/"+$routeParams.video, info).success(function(res){
			console.log(res);
		}).error(function(err) {
			console.log(err);
		});

	$http.get("/api/pageview/"+$routeParams.video).success(function(res){

		var res = res[0];
		info.id = res._id;
		info.viewCount = res.viewCount + 1;
		console.log(info);
		console.log(res);

		$scope.views = info.viewCount;

		$http.post("/api/pageview/"+$routeParams.video, info).success(function(res){
			console.log(res);
		}).error(function(err) {
			console.log(err);
		});

	}).error(function(err){
		console.log(err)
	})

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
					  console.log($scope.recipes);
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
	$scope.alreadySaved = false;
	$scope.ifSaved = function() {
		$http.get('/api/saved').success(function(response){
			var videoSlug = $routeParams.video;
			console.log("following");
			console.log(response); 

			for (i = 0; i < response.length; i++) {
				if(response[i].saved[0].fields.slug == videoSlug) {
					$scope.alreadySaved = true;
					console.log(response[i].saved[0].fields.slug)
				} 
			}
			console.log($scope.alreadySaved);
		}).error(function(err) {
			console.log(err)
		});
	}
	$scope.ifSaved();

  	$scope.goTo = function(url) {
  		window.location.href = "/#/v/"+url;
  	}

  	$scope.save_content = function(slug) {
  	  console.log($scope.video)
	  $http.post('/api/saved', $scope.video).success(function(response){
			console.log('video saved')
			console.log($scope.video)
			console.log(response)
			$scope.alreadySaved = true;
			$mdToast.show(
	            $mdToast.simple()
	              .textContent('The video has been saved')
	              .position("top right")
	              .hideDelay(3000)
	          );
			//$scope.post = {url: parenturl}
		}).error(function(error) {
			console.log(error)
			$mdToast.show(
	            $mdToast.simple()
	              .textContent('You need to log in!!')
	              .position("top right")
	              .hideDelay(3000)
	          );
		});
	}
	getVideo();

});






