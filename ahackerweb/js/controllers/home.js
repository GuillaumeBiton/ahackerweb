'use strict';

app.controller("homeCtrl", function($rootScope, $scope, news, hnapi) {
    $scope.news = news.data;
    
    $scope.news2 = function() {
        hnapi.news2().then(function(result){
            $scope.news = $scope.news.concat(result.data);
        });
    };
    
    $scope.refresh = function() {
        var date = (+new Date());
        hnapi.news(date).then(function(result){
            $scope.news = result.data;
        });
    };
    
     $scope.pointForms = {
        0: "{} point",
        one: "{} point",
        other: "{} points"
    };
    
    $scope.commentForms = {
        0: "no comment",
        one: "{} comment",
        other: "{} comments"
    };
    
    $scope.markupStory = function(post) {
        return (/^îtem/i.test(post.url)) ? post.url : "#/item/" + post.id;
    };
});