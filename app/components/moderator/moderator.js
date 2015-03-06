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
                var ref = new Firebase('https://pollreal.firebaseio.com/sessions/'+scope.poll);
                var syncObject = $firebaseObject(ref);
                syncObject.$bindTo(scope, "data");
                
                scope.previous = "<--Prev";
                scope.next = "Next-->";
                
                scope.addAnswer = function() {
                    scope.data.questions[scope.data.current].answers.push({responses:0,text:'',color:'#369'})  
                };
                
                scope.removeAnswer = function(index) {
                    scope.data.questions[scope.data.current].answers.splice(index,1); 
                };
                
                scope.previousQuestion = function() {
                    scope.data.questions[scope.data.current].active=false; 
                    scope.data.current = scope.data.current >0 ? scope.data.current-1 : 0  
                };
                
                scope.nextQuestion = function() {
                    scope.data.questions[scope.data.current].active=false; 
                    scope.data.current = scope.data.current < scope.data.questions.length-1 ? scope.data.current+1 : scope.data.questions.length-1;
                    scope.next = scope.data.current === scope.data.questions.length-1 ? 'Next-->' : 'Add Question';
                };
                
                scope.addQuestion = function() {
                    scope.data.questions.push({active:false, answers:[], question: 'New Question', totalResponses: 0});   
                }
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
