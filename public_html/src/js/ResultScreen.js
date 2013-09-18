
(function(window, $) {
    'use strict';

    var ResultScreen = function($element) {
        Screen.apply(this, [$element]);
    };

    ResultScreen.prototype = Object.create(Screen.prototype);
    ResultScreen.prototype.constructor = ResultScreen;

    ResultScreen.prototype.onUpdate = function(delta) {

    };

    ResultScreen.prototype.onPause = function( ) {

    };

    ResultScreen.prototype.onLeave = function( ) {
        disableButtons( );
    };

    ResultScreen.prototype.onResume = function( ) {
        enableButtons(this);
    };

    function enableButtons(resultScreen) {

    }

    function disableButtons( ) {

    }

    window.ResultScreen = ResultScreen;
})(window, jQuery);
