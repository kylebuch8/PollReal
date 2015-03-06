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

        .controller('DisplayController', [
            '$scope',
            '$rootScope',
            '$routeParams',
            '$filter',
            '$firebaseObject',
            'FIREBASE_URL',
            function ($scope, $rootScope, $routeParams, $filter, $firebaseObject, FIREBASE_URL) {
                var ref = new Firebase(FIREBASE_URL + '/sessions/' + $routeParams.id),
                    syncObject = $firebaseObject(ref),
                    topAnswer;

                syncObject.$bindTo($scope, 'data');

                $scope.$watch('data.questions[data.current].answers', function (answers) {
                    if (answers) {
                        topAnswer = $filter('orderBy')(answers, 'responses', true)[0];
                        if (topAnswer.responses > 0) {
                            $rootScope.bg = topAnswer.color;
                        }
                    }
                }, true);
            }
        ]);
}());
