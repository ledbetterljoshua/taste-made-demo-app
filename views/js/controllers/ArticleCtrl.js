angular.module('ArticleCtrl', []).controller('ArticleController', function($scope, contentful, $routeParams, $sce) {
	var getArticle = function() {
		contentful.entries("content_type=article&fields.slug="+$routeParams.slug)
			.then(
			// Success handler
			function(response){
			  	console.log(response.data.items[0]);
			  	$scope.article = response.data.items[0];
			},

			// Error handler
			function(response){
			  return response.status;
			  console.log('Oops, error ' + response.status);
			}
		);
	}
	getArticle();
});