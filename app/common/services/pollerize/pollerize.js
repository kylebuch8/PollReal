(function () {
    'use strict';

    /*global angular*/
    angular.module('services.pollerize', [
        'firebase'
    ])

        .constant('FIREBASE_URL', 'https://pollreal.firebaseio.com')

        .factory('PollerizeAuth', ["$firebaseAuth", "FIREBASE_URL",
          function($firebaseAuth, FIREBASE_URL) {
            var ref = new Firebase(FIREBASE_URL, "pollerize");
            return $firebaseAuth(ref);
          }
        ])

        .factory('PollerizeSession', ['$firebaseObject', 'FIREBASE_URL', function ($firebaseObject, FIREBASE_URL) {
            return function(poll) {
                var ref;
                // if poll is undefined return list of sessions
                if ( typeof poll !== 'undefined' ) {
                    if ( typeof poll === 'string' ) {
                        // create a reference to the Firebase where we will store our data
                        ref = new Firebase(FIREBASE_URL + '/sessions/' + poll);
                    } else if (poll.userid) {
                        ref = new Firebase(FIREBASE_URL + '/users/' + poll.userid);
                    }
                } else {
                    ref = new Firebase(FIREBASE_URL + '/sessions');
                }

                return $firebaseObject(ref);
            }
        }])

        .factory('PollerizeQuestion', ['$firebaseObject', 'FIREBASE_URL', function ($firebaseObject, FIREBASE_URL) {
            return function(poll, question, answer) {
                // create a reference to the Firebase where we will store our data
                var ref = new Firebase(FIREBASE_URL + '/sessions/' + poll + '/questions/' + question + '/answers/' + answer + '/responses');

                return $firebaseObject(ref);
            }
        }]);
}());
