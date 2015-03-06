(function () {
    'use strict';

    /*global angular*/
    angular.module('user', [
        'ngRoute',
        'ngAnimate'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'components/user/user.html',
                    controller: 'UserController'
                });
        }])

        .controller('UserController', [function () {

        }]);
}());
