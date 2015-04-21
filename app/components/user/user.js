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

        .controller('UserController', [
            '$scope',
            '$rootScope',
            '$routeParams',
            'PollerizeSession',
            'PollerizeQuestion',
            function ($scope, $rootScope, $routeParams, Session, Question) {
                var answerIndex;

                Session($routeParams.id).$bindTo($scope, "data");

                /*
                 * when the moderator changes the question, be sure to reset
                 * the values
                 */
                $scope.$watch('data.current', function (newValue, oldValue) {
                    $rootScope.bg = null;
                    $scope.answerIndex = null;
                    answerIndex = null;
                });

                $scope.update = function (index) {
                    var updateRef = Question($routeParams.id, $scope.data.current, index);
                    if (answerIndex !== null && answerIndex !== index) {
                        var oldUpdateRef = Question($routeParams.id, $scope.data.current, answerIndex);

                        oldUpdateRef.transaction(function (currentNumResponses) {
                            return currentNumResponses -= 1;
                        });

                        updateRef.transaction(function (currentNumResponses) {
                            return currentNumResponses += 1;
                        });

                        answerIndex = index;
                    } else {
                        if (answerIndex !== index) {

                            updateRef.transaction(function (currentNumResponses) {
                                return currentNumResponses += 1;
                            });

                            answerIndex = index;
                        }
                    }

                    $scope.answerIndex = answerIndex;
                    $rootScope.bg = $scope.data.questions[$scope.data.current].answers[answerIndex].color;
                };
            }
        ]);
}());
