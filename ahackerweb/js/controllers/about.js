'use strict';

app.controller('aboutCtrl', function($scope) {
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
});