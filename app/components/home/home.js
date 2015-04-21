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
                    controller: 'HomeController',
                    resolve: {
                        "currentAuth": ["PollerizeAuth", function(Auth) {
                            // $waitForAuth returns a promise so the resolve waits for it to complete
                            return Auth.$waitForAuth();
                        }]
                    }
                });
        }])

        .controller('HomeController', [
            '$scope',
            '$location',
            'PollerizeAuth',
            'currentAuth',
            'PollerizeSession',
            function ($scope, $location, Auth, currentAuth, Sessions) {
                $scope.auth = Auth;
                $scope.sessions = Sessions();

                // any time auth status updates, add the user data to scope
                $scope.auth.$onAuth(function(authData) {
                    $scope.authData = authData;
                });

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
