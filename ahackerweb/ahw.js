var app = angular.module("ahw", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
        resolve: {
            news: function(hnapi) {
                return hnapi.news();
            },
            post: function($route, hnapi) {
                return ($route.current.params.id) ? hnapi.item($route.current.params.id) : null;
            },
            aboutModal: function() {
                return false;
            }
        }
    })
    .when('/about', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
        resolve: {
            news: function(hnapi) {
                return hnapi.news();
            },
            post: function($route, hnapi) {
                return ($route.current.params.id) ? hnapi.item($route.current.params.id) : null;
            },   
            aboutModal: function() {
                return true;
            }
        }
    })
    .when('/item/:id', {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl',
          resolve: {
            news: function(hnapi) {
                return hnapi.news();
            },
            post: function($route, hnapi) {
                return hnapi.item($route.current.params.id);
            },
              aboutModal: function() {
                return false;
            }
          }
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.constant('api', { url : 'http://node-hnapi-eu.herokuapp.com/' });
app.constant('wideScreen', function() {
    return window.innerWidth >=640
});

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