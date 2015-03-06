(function () {
    'use strict';

    /*global angular*/
    angular.module('moderator', [
        'ngRoute',
        'ngAnimate'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/:id/moderator', {
                    templateUrl: 'components/moderator/moderator.html',
                    controller: 'ModeratorController'
                });
        }])

        .controller('ModeratorController', ['$scope', '$routeParams', function ($scope, $routeParams) {
            $scope.id = $routeParams.id;
        }])
        
        .directive('prModerator', ['$firebaseObject', function($firebaseObject) {
            function link(scope, element, attrs) {
                var ref = new Firebase('<FIREBASEURL>'+scope.poll);
                var syncObject = $firebaseObject(ref);
                syncObject.$bindTo(scope, "data");
            }
            
            return {
                link: link,
                scope: {
                    poll: '=poll'
                },
                templateUrl: '/components/moderator/admin.html'
            };
        }]);
}());
