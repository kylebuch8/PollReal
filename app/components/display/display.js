(function () {
    'use strict';

    /*global angular*/
    angular.module('display', [
        'ngRoute',
        'ngAnimate',
        'directives.chart'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/:id/display', {
                    templateUrl: 'components/display/display.html',
                    controller: 'DisplayController'
                });
        }])

        .controller('DisplayController', [
            '$scope',
            '$rootScope',
            '$routeParams',
            '$filter',
            'PollerizeSession',
            function ($scope, $rootScope, $routeParams, $filter, Session) {
                var topAnswer;

                Session($routeParams.id).$bindTo($scope, 'data');

                $scope.$watch('data.current', function (newValue) {
                    if (Number.isInteger(newValue)) {
                        $scope.labels = null;
                        $scope.values = null;
                    }
                });

                $scope.$watch('data.questions[data.current].answers', function (answers) {
                    if (answers) {
                        if (!$scope.labels) {
                            $scope.labels = answers.map(function (answer) {
                                return answer.text;
                            });
                        }

                        $scope.values = answers.map(function (answer) {
                            return {
                                responses: answer.responses,
                                fillColor: answer.color
                            };
                        });

                        topAnswer = $filter('orderBy')(answers, 'responses', true)[0];
                        if (topAnswer.responses > 0) {
                            $rootScope.bg = topAnswer.color;
                        }
                    }
                }, true);
            }
        ]);
}());
