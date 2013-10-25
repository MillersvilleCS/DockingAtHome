
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
        $('#resultUI').removeClass('in active');
    };

    ResultScreen.prototype.onResume = function( ) {
        enableButtons(this);
        $('#resultUI').addClass('in active');
    };

    function enableButtons(resultScreen) {
        $('#resultUI').find('.button[data-logic=\'submitAgain\']').on('click', function() {
            /* TODO - Do Submission */

            //if success
            resultScreen.$element.trigger(new ScreenChangeEvent('main'));
        });
    }

    function disableButtons( ) {
        $('#resultUI').off('click');
    }

    window.ResultScreen = ResultScreen;
})(window, jQuery);
