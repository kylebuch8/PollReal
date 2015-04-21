(function () {
    'use strict';

    /*global angular*/
    angular.module('services.pollerize', [
        'firebase'
    ])

        .factory('PollerizeAuth', [
            '$firebaseAuth',
            'FIREBASE_URL',
            function($firebaseAuth, FIREBASE_URL) {
                var ref = new Firebase(FIREBASE_URL, "pollerize");
                return $firebaseAuth(ref);
            }
        ])

        .factory('PollerizeSession', [
            '$firebaseObject',
            'FIREBASE_URL',
            function ($firebaseObject, FIREBASE_URL) {
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
            }
        ])

        .factory('PollerizeQuestion', [
            '$firebaseObject',
            'FIREBASE_URL',
            function ($firebaseObject, FIREBASE_URL) {
                return function(poll, question, answer) {
                    var ref = new Firebase(FIREBASE_URL + '/sessions/' + poll + '/questions/' + question + '/answers/' + answer + '/responses');
                    return ref;
                }
            }
        ])

        .factory('Palette', [
            '$q',
            'FIREBASE_URL',
            function ($q, FIREBASE_URL) {
                var Palette = {},
                    ref = new Firebase(FIREBASE_URL + '/palette'),
                    colors = [];

                Palette.get = function () {
                    var deferred = $q.defer();

                    if (!colors.length) {
                        ref.once('value', function (snap) {
                            colors = snap.val();
                            deferred.resolve(colors);
                        });
                    } else {
                        deferred.resolve(colors);
                    }

                    return deferred.promise;
                };

                Palette.pick = function (usedColors) {
                    var deferred = $q.defer(),
                        filteredColors,
                        randomColor;

                    if (!colors.length) {
                        return Palette.get().then(function () {
                            return Palette.pick(usedColors);
                        });
                    }

                    if (!usedColors || !usedColors.length) {
                        filteredColors = colors;
                    } else {
                        filteredColors = colors.filter(function (color) {
                            return (usedColors.indexOf(color) > -1) ? false : true;
                        });
                    }

                    randomColor = filteredColors[Math.floor(Math.random() * filteredColors.length)];

                    deferred.resolve(randomColor);

                    return deferred.promise;
                };

                return Palette;
            }
        ]);
}());
