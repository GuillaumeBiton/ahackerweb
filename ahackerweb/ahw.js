var app = angular.module("ahw", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
        resolve: {
            news: function(hnapi) {
                return hnapi.news();
            }
        }
    })
    .when('/about', {
        templateUrl: 'templates/about.html'
    })
    .when('/item/:id', {
          templateUrl: 'templates/comments.html',
          controller: 'commentsCtrl',
          resolve: {
            post: function($route, hnapi) {
                return hnapi.item($route.current.params.id);
            }       
          }
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.constant('api', { url : 'http://node-hnapi-eu.herokuapp.com/' });

app.config(function ($provide, $httpProvider) {
    $provide.factory('xhrIndicator', function($q, $rootScope, api) {
        $rootScope.xhrPending = false;
        return {
            request: function(config) {
                if (~config.url.indexOf(api.url)) $rootScope.xhrPending = true;
                return config || $q.when(config);
            },
            response: function(response) {
                if (~response.config.url.indexOf(api.url)) $rootScope.xhrPending = false;
                return response || $q.when(response);
            }
        }
    });
    $httpProvider.interceptors.push('xhrIndicator');
});