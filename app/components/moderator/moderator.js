(function () {
    'use strict';

    /*global angular*/
    angular.module('moderator', [
        'ngRoute',
        'ngAnimate'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/moderator', {
                    templateUrl: 'components/moderator/moderator.html',
                    controller: 'ModeratorController'
                });
        }])

        .controller('ModeratorController', [function () {

        }]);
}());
