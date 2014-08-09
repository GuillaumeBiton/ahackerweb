var app = angular.module("ahw", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {})
    .when('/about', {})
    .when('/item/:id', {})
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

app.run(function ($rootScope, $route, $location, $window) {
  window.onresize = function() {
    $rootScope.isWideScreen = (window.innerWidth >= 640) ? true : false;
    $route.reload();
  }
});