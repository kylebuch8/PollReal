(function () {
    'use strict';

    /*global angular*/
    angular.module('pollReal', [
        'firebase',
        'home',
        'user',
        'moderator',
        'display'
    ])

        .constant('FIREBASE_URL', 'https://pollreal.firebaseio.com');
}());
