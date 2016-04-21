// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: '../partials/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/search', {
            templateUrl: '../partials/search.html',
            controller: 'SearchController'
        })
        .when('/profile', {
            templateUrl: '../partials/profile.html',
            controller: 'ProfileController'
        })
        .when('/profile/:user', {
            templateUrl: '../partials/profile.html',
            controller: 'ProfileController'
        })
        .when('/v/:video', {
            templateUrl: '../partials/video.html',
            controller: 'VideoController'
        })
        .when('/b/:slug', {
            templateUrl: '../partials/article.html',
            controller: 'ArticleController'
        })
        .when('/discover/', {
            templateUrl: '../partials/discover.html',
            controller: 'DiscoverController'
        })
        .otherwise({
            redirectTo: '/'
        });

    

}]);