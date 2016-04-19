// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, contentful, $timeout, $mdSidenav, $log, $sce) {
  var deQuery;
  $scope.isSidenavOpen = false;
      
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
      
    $scope.$watch('isSidenavOpen', function(isSidenavOpen) {
        console.log('sidenav is ' + (isSidenavOpen ? 'open' : 'closed'));
    });

    var getContentful = function(content) {
        contentful.entries(content)
          .then(
          // Success handler
          function(response){
            return response.data;
            console.log(entries);
          },

          // Error handler
          function(response){
            return response.status;
            console.log('Oops, error ' + response.status);
          }
        );
    }

  $scope.getAuthors = function() {
    contentful.entries("content_type=author&limit=20&skip=40")
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

  $scope.getAuthors();
  $scope.top = function() {
    window.scrollTo(1,0);
  }

  $scope.getRecipes = function() {
    contentful.entries("content_type=video&limit=50&skip=0")
        .then(
        // Success handler
        function(response){
          $scope.recipes = response.data;
          console.log(response.data);
          $scope.updateMiddle($scope.recipes.items[0].fields.slug)
        },

        // Error handler
        function(response){
          return response.status;
          console.log('Oops, error ' + response.status);
        }
      );
  }
  $scope.getRecipes();

  $scope.updateMiddle = function(slug){
    $scope.recipeMiddle = 
    contentful.entries("content_type=video&fields.slug="+slug)
        .then(
        // Success handler
        function(response){
          $scope.middleRecipe = response.data;
          console.log("$scope.middleRecipe: "+ $scope.middleRecipe.items[0].fields.landscapeAsset.fields.awsRenditions[0].src)
          $scope.videoRecipe = {};
          $scope.videoRecipe.config = {
              sources: [
                {src: $sce.trustAsResourceUrl($scope.middleRecipe.items[0].fields.landscapeAsset.fields.awsRenditions[0].src), type: "video/mp4"},
                {src: $sce.trustAsResourceUrl($scope.middleRecipe.items[0].fields.landscapeAsset.fields.awsRenditions[1].src), type: "video/webm"},
                {src: $sce.trustAsResourceUrl($scope.middleRecipe.items[0].fields.landscapeAsset.fields.awsRenditions[2].src), type: "video/ogg"}
              ],
              autoPlay: true,
              theme: "../../js/videogular-themes-default/videogular.css",
              plugins: {
                poster: $scope.middleRecipe.items[0].fields.landscapeAsset.fields.awsStill
              }
            };
          console.log(response.data);
        },

        // Error handler
        function(response){
          return response.status;
          console.log('Oops, error ' + response.status);
        }
      );
  }

	$scope.cssClass = 'view1';
  $scope.tagline = 'To the moon and back!';   

})
.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
              //Also remove . and , so its gives a cleaner result.
              if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                lastspace = lastspace - 1;
              }
              value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
})
.filter("trustUrl", ['$sce', function ($sce) {
  return function (recordingUrl) {
      return $sce.trustAsResourceUrl(recordingUrl);
  };
}]);