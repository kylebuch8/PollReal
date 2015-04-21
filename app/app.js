(function () {
    'use strict';

    /*global angular*/
    angular.module('pollerize', [
        'firebase',
        'home',
        'user',
        'moderator',
        'display',
        'services.pollerize'
    ])
        .run(['$rootScope', '$location', function ($rootScope, $location) {
           $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
              // We can catch the error thrown when the $requireAuth promise is rejected
              // and redirect the user back to the home page
              if (error === "AUTH_REQUIRED") {
                $location.path("/");
              }
            });
        }]);

    /*
     * fastclick!!!
     */
     if ('addEventListener' in document) {
         document.addEventListener('DOMContentLoaded', function() {
             FastClick.attach(document.body);
         }, false);
     }
}());
