(function () {
    'use strict';

    /*global angular*/
    angular.module('user', [
        'ngRoute',
        'ngAnimate'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/:id', {
                    templateUrl: 'components/user/user.html',
                    controller: 'UserController'
                });
        }])

        .controller('UserController', ['$scope', function ($scope) {
            $scope.question = {
                text: 'Some Question?',
                answers: [
                    {
                        text: 'Answer 1'
                    },
                    {
                        text: 'Answer 2'
                    }
                ]
            };

            $scope.change = function () {
                console.log('changed');
            };
        }]);
}());
