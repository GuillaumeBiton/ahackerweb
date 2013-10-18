'use strict';

app.controller('commentsCtrl', function($scope, $sce, post) {
    $scope.post = post.data;
    
    $scope.deliberatelyTrustDangerousSnippet = function(html) {
        return $sce.trustAsHtml(html);
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
    
    $scope.pollPourcentage = function(value) {
        var total = $scope.post.poll.reduce(function(a,b) {
            return a.points + b.points;
        });
        return value * 100 / total 
    };
});