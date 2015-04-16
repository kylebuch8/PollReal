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
            '$firebaseObject',
            'FIREBASE_URL',
            function ($scope, $rootScope, $routeParams, $firebaseObject, FIREBASE_URL) {
                var ref = new Firebase(FIREBASE_URL + '/sessions/' + $routeParams.id),
                    syncObject = $firebaseObject(ref),
                    answerIndex;

                syncObject.$bindTo($scope, "data");

                /*
                 * when the moderator changes the question, be sure to reset
                 * the values
                 */
                $scope.$watch('data.current', function (newValue, oldValue) {
                    //if (newValue !== oldValue) {
                        $rootScope.bg = null;
                        $scope.answerIndex = null;
                        answerIndex = null;
                    //}
                });

                $scope.update = function (index) {
                    if (answerIndex !== null && answerIndex !== index) {
                        var oldUpdateRef = new Firebase(FIREBASE_URL + '/sessions/' + $routeParams.id + '/questions/' + $scope.data.current + '/answers/' + answerIndex + '/responses');
                        var updateRef = new Firebase(FIREBASE_URL + '/sessions/' + $routeParams.id + '/questions/' + $scope.data.current + '/answers/' + index + '/responses');


                        oldUpdateRef.transaction(function (currentNumResponses) {
                            return currentNumResponses -= 1;
                        });

                        updateRef.transaction(function (currentNumResponses) {
                            return currentNumResponses += 1;
                        });

                        answerIndex = index;
                    } else {
                        var updateRef = new Firebase(FIREBASE_URL + '/sessions/' + $routeParams.id + '/questions/' + $scope.data.current + '/answers/' + index + '/responses');

                        updateRef.transaction(function (currentNumResponses) {
                            return currentNumResponses += 1;
                        });

                        answerIndex = index;
                    }

                    $scope.answerIndex = answerIndex;
                    $rootScope.bg = $scope.data.questions[$scope.data.current].answers[answerIndex].color;
                };
            }
        ]);
}());
