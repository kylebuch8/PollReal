(function () {
    'use strict';

    /*global angular*/
    angular.module('pollReal', [
        'firebase',
        'user',
        'moderator',
        'display'
    ])

        .constant('FIREBASE_URL', 'https://pollreal.firebaseio.com');
}());
