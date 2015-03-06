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
            '$routeParams',
            '$firebaseObject',
            'FIREBASE_URL',
            function ($scope, $routeParams, $firebaseObject, FIREBASE_URL) {
                var ref = new Firebase(FIREBASE_URL + '/sessions/' + $routeParams.id),
                    syncObject = $firebaseObject(ref);

                syncObject.$bindTo($scope, 'data');
            }
        ]);
}());
