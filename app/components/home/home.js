(function () {
    'use strict';

    /*global angular*/
    angular.module('home', [
        'ngRoute',
        'ngMessages'
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
                    $scope.submitted = true;

                    if (!$scope.homeForm.$valid) {
                        return;
                    }

                    $location.path('/' + $scope.id);
                };
            }
        ]);
}());
