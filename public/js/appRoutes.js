// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })
        .when('/profile/:user', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })
        .when('/v/:video', {
            templateUrl: 'views/video.html',
            controller: 'VideoController'
        })
        .when('/b/:slug', {
            templateUrl: 'views/article.html',
            controller: 'ArticleController'
        })
        .when('/discover/', {
            templateUrl: 'views/discover.html',
            controller: 'DiscoverController'
        })
        .otherwise({
            redirectTo: '/'
        });

    

}]);