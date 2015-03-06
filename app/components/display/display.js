(function () {
    'use strict';

    /*global angular*/
    angular.module('display', [
        'ngRoute',
        'ngAnimate'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/display', {
                    templateUrl: 'components/display/display.html',
                    controller: 'DisplayController'
                });
        }])

        .controller('DisplayController', [function () {
            
        }]);
}());
