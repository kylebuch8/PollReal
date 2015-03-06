(function () {
    'use strict';

    /*global angular*/
    angular.module('display', [
        'ngRoute',
        'ngAnimate'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/:id/display', {
                    templateUrl: 'components/display/display.html',
                    controller: 'DisplayController'
                });
        }])

        .controller('DisplayController', ['$scope', function ($scope) {
            $scope.question = {
                text: 'Some Question?',
                answers: [
                    {
                        text: 'Answer 1',
                        responses: 0
                    },
                    {
                        text: 'Answer 2',
                        responses: 0
                    }
                ]
            };
        }]);
}());
