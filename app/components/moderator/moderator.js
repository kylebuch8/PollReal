(function () {
    'use strict';

    /*global angular*/
    angular.module('moderator', [
        'ngRoute',
        'ngAnimate',
        'ngSanitize'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/:id/moderator', {
                    templateUrl: 'components/moderator/moderator.html',
                    controller: 'ModeratorController',
                    resolve: {
                        // controller will not be loaded until $waitForAuth resolves
                        // Auth refers to our $firebaseAuth wrapper in the example above
                        "currentAuth": ["PollerizeAuth", function(Auth) {
                            // $waitForAuth returns a promise so the resolve waits for it to complete
                            return Auth.$requireAuth();
                        }]
                    }
                });
        }])

        .controller('ModeratorController', [
            '$scope',
            '$routeParams',
            'currentAuth',
            'PollerizeSession',
            'Palette',
            function ($scope, $routeParams, Auth, Session, Palette) {
                var answersColors = [];

                /*
                 * get all of the colors first, then work through creating
                 * the session
                 */
                Palette
                    .get()
                    .then(function () {
                        Session($routeParams.id).$bindTo($scope, "data")
                            .then(function () {
                                if (typeof $scope.data.owner === 'undefined') {
                                    $scope.data.owner = {
                                        id: Auth.uid,
                                        name: Auth.google.displayName,
                                        link: Auth.google.cachedUserProfile.link,
                                        picture: Auth.google.cachedUserProfile.picture
                                    }
                                }

                                if (typeof $scope.data.active === 'undefined') {
                                    $scope.data.active = false;
                                }

                                if (typeof $scope.data.current === 'undefined') {
                                    $scope.data.current = 0;
                                }

                                if (typeof $scope.data.title === 'undefined') {
                                    $scope.data.title = "Great New Poll";
                                }

                                /*
                                 * TODO: select random color from palette and keep
                                 * track of the used colors for each question
                                 */
                                if (typeof $scope.data.questions === 'undefined') {
                                    $scope.data.questions = [];

                                    Palette
                                        .pick()
                                        .then(function (color) {
                                            $scope.data.questions[0] = {
                                                active: false,
                                                answers: [{
                                                    color: color,
                                                    responses: 0,
                                                    text: "Default Answer"
                                                }],
                                                question: "Bold New Question",
                                                totalResponses: 0
                                            };

                                            answersColors.push({
                                                0: [color]
                                            });
                                        });
                                }

                                $scope.next = $scope.data.current === $scope.data.questions.length-1 ? 'Add Question' : 'Next-->';
                                $scope.previous = "<--Prev";

                            }, function (error) {

                            }
                        );
                    });



                /*
                 * TODO: keep track of selected colors. not sure if we should do
                 * this in the controller or the service
                 */
                $scope.addAnswer = function() {
                    Palette.pick().then(function (color) {
                        $scope.data.questions[$scope.data.current].answers.push({
                            responses: 0,
                            text: '',
                            color: color
                        });
                    });
                };

                /*
                 * TODO: remove color from an array of selected colors so we can
                 * use it on the palette again
                 */
                $scope.removeAnswer = function(index) {
                    $scope.data.questions[$scope.data.current].answers.splice(index,1);
                };

                $scope.previousQuestion = function() {
                    $scope.data.questions[$scope.data.current].active=false;
                    $scope.data.current = $scope.data.current > 0 ? $scope.data.current-1 : 0;
                    $scope.next = $scope.data.current === $scope.data.questions.length-1 ? 'Add Question' : 'Next-->';
                };

                $scope.nextQuestion = function() {
                    $scope.data.questions[$scope.data.current].active=false;
                    if($scope.next === 'Add Question') {
                        $scope.data.questions.push({active: false, answers: [{color: "#3F51B5", responses: 0, text: "Default Answer"}], question: 'New Question', totalResponses: 0});
                    }
                    $scope.data.current = $scope.data.current < $scope.data.questions.length-1 ? $scope.data.current+1 : $scope.data.questions.length-1;
                    $scope.next = $scope.data.current === $scope.data.questions.length-1 ? 'Add Question' : 'Next-->';
                };

                $scope.removeQuestion = function() {

                };
            }
        ])

        .directive('contenteditable', [
            '$sce',
            function($sce) {
                return {
                    restrict: 'A', // only activate on element attribute
                    require: '?ngModel', // get a hold of NgModelController
                    link: function(scope, element, attrs, ngModel) {
                        if (!ngModel) return; // do nothing if no ng-model

                        // Specify how UI should be updated
                        ngModel.$render = function() {
                            element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                        };

                        // Listen for change events to enable binding
                        element.on('blur keyup change', function() {
                            scope.$evalAsync(read);
                        });

                        read(); // initialize

                        // Write data to the model
                        function read() {
                            var html = element.text();
                            // When we clear the content editable the browser leaves a <br> behind
                            // If strip-br attribute is provided then we strip this out
                            if ( attrs.stripBr && html == '<br>' ) {
                                html = '';
                            }

                            ngModel.$setViewValue(html);
                        }
                    }
                };
            }
        ]);
}());
