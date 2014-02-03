'use strict';

app.controller("homeCtrl", function($rootScope, $scope, $sce, news, hnapi, wideScreen, post, aboutModal) {
    $scope.news = news.data;
    $scope.post = (post) ? post.data : null;
    
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
    
        $scope.deliberatelyTrustDangerousSnippet = function(html) {
        return $sce.trustAsHtml(html);
    };
    
    $scope.pollPourcentage = function(value) {
        var total = $scope.post.poll.reduce(function(a,b) {
            return a.points + b.points;
        });
        return value * 100 / total 
    };
    
    $scope.isWideScreen = wideScreen();
    
    var webStyle = function() {
        for(var i = document.styleSheets.length - 1; i >=0; i--) {
            var styleSheet = document.styleSheets[i];
            if (styleSheet.href && ~styleSheet.href.indexOf('hw-web.css') && !styleSheet.disabled) return true
        }
        return false;
    };
    $scope.isWebStyle = webStyle();
    
    $scope.changeTheme = function() {
        var linkEls = document.querySelectorAll('link.theme');
        var sheetIndex = 0;
        angular.forEach(linkEls, function(stylesheet, i) {
            if(!stylesheet.disabled) {
                sheetIndex = i;
            }
        });
        linkEls[sheetIndex].disabled = true;
        linkEls[(sheetIndex + 1) % linkEls.length].disabled = false;
    };
    
    $scope.aboutModal = aboutModal;
});