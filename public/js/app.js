// public/js/app.js
angular.module('tasteMade', [
	'ngMaterial', 
	'ksSwiper', 
	'contentful', 
	'ngRoute', 
	'appRoutes', 
	'MainCtrl', 
	'VideoCtrl', 
	'ArticleCtrl',
	'DiscoverCtrl',
	'SearchCtrl', 
	'ProfileCtrl', 
	"ngSanitize",
	"com.2fdevs.videogular",
	"com.2fdevs.videogular.plugins.controls",
	"com.2fdevs.videogular.plugins.overlayplay",
	"com.2fdevs.videogular.plugins.poster"]);

angular
  .module('tasteMade')
  .config(function(contentfulProvider){
    contentfulProvider.setOptions({
        space: 'pxqrocxwsjcc',
        accessToken: 'b46f5d27b49f0ae7e9bd8e8d0a645d2c220eefe60f64d09a10ce12e4d429ce43'
    });
  });