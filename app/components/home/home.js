(function () {
    'use strict';

    /*global angular*/
    angular.module('home', [
        'ngRoute'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController'
                });
        }])

        .controller('HomeController', [
            '$scope',
            '$location',
            function ($scope, $location) {
                $scope.submit = function () {
                    $location.path('/' + $scope.id);
                };
            }
        ]);
}());
