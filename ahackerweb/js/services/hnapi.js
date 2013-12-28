'use strict';

app.factory('hnapi', function($http, api) {
    return {
        news: function(date) {
            var newsUrl;
            newsUrl = (date) ? api.url + 'news?' + date : api.url + 'news?' + (+new Date());
            return $http.get(newsUrl);
        },
        news2: function(date) {
            var newsUrl;
            newsUrl = (date) ? api.url + 'news2?' + date : api.url + 'news2?' + (+new Date());
            return $http.get(newsUrl);
        },
        item: function(id) {
            return $http.get(api.url + 'item/' + id);
        },
        comments: function(id) {
            return $http.get(api.url + 'comments/' + id);
        }
    };
});