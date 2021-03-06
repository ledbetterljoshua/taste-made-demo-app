// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $rootScope, contentful, $timeout, $mdSidenav, $log, $sce, $mdToast, $http) {
  var deQuery;

  $rootScope.$on("$locationChangeStart", function(event, next, current) { 
    var url = next; 
    $scope.hash = url.substring(url.indexOf('#')-1)
    console.log($scope.hash)
  });

  
  

  $scope.loginclicked = function() {
    var view = document.getElementById("view");
    var loginBox = document.getElementById("login-box");
    var background = document.getElementById("login-background")
    console.log('clicked')
    view.className = "blur";
    background.className = "login-background-show";
    setTimeout(function(){
      loginBox.className = "show";
    }, 100)
  }
  $scope.loginBackgroundShow = function() {
    var view = document.getElementById("view");
    var loginBox = document.getElementById("login-box");
    var background = document.getElementById("login-background")
    view.className = "";
    loginBox.className = "";
    background.className = "";
  } 

  $scope.showAlt = function() {
    var loginBoxCont = document.getElementById("login-box"); 
    loginBoxCont = loginBoxCont.getElementsByClassName('container');
    loginBoxCont[0].className = loginBoxCont[0].className + " active";
  }
  $scope.closeRegister = function() {
    var loginBoxCont = document.getElementById("login-box"); 
    loginBoxCont = loginBoxCont.getElementsByClassName('container');
    loginBoxCont[0].className = "container";
  }




  $scope.classhidden = "hidden";
  $scope.changeClass = function(){
    if ($scope.classhidden === "hidden")
      $scope.classhidden = "show";
    else
      $scope.classhidden = "hidden";
  };

  $scope.detectmob = function() { 
     if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
        return true;
      }
     else {
        return false;
      }
  }
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
    contentful.entries("content_type=author&limit=30&skip=40")
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

  $scope.getRecipesSlide = function() {
    contentful.entries("content_type=video&limit=50&skip=20")
        .then(
        // Success handler
        function(response){
          $scope.recipesSlide = response.data;
          console.log(response.data);
        },

        // Error handler
        function(response){
          return response.status;
          console.log('Oops, error ' + response.status);
        }
      );
  }
  $scope.getRecipesSlide();

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
  $http.get('/api/user').success(function() {
      console.log("user is logged in");
      $scope.isLoggedIn = true;
  });
  $scope.checkUser = function() {
    if($scope.isLoggedIn) {
      console.log("user is logged in");
      window.location.href = "/#/me";
      $scope.isLoggedIn = true;
    } else {
      $scope.isLoggedIn = false;
      $mdToast.show(
        $mdToast.simple()
          .textContent('You need to log in!!')
          .position("top right")
          .hideDelay(3000)
      );
    }
  }
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
.filter("htmlify",   function() {

})
.filter("trustUrl", ['$sce', function ($sce) {
  return function (recordingUrl) {
      return $sce.trustAsResourceUrl(recordingUrl);
  };
}]);