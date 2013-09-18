(function(window, $) {
    'use strict';

    var JobSubmission = function() {

        var mainScreen = new MainScreen($('#mainUI'));
        var resultScreen = new ResultScreen($('#resultUI'));
        var loginScreen = new LoginScreen($('#loginUI'));

        Game.apply(this, [loginScreen]);

        $(document).on('screenChange', screenChangeHandler.bind(this));
        this.addScreen('main', mainScreen);
        this.addScreen('result', resultScreen);
        this.addScreen('login', loginScreen);

        loginScreen.onResume();
    };

    JobSubmission.prototype = Object.create(Game.prototype);
    JobSubmission.prototype.constructor = JobSubmission;

    JobSubmission.prototype.update = function(delta) {
        this.currentScreen.onUpdate(delta);
    };

    JobSubmission.prototype.changeScreens = function(screenID) {
        Game.prototype.changeScreens.call(this, screenID);
    };

    function screenChangeHandler(e) {
        this.changeScreens(e.screenID);
    }

    window.JobSubmission = JobSubmission;
})(window, jQuery);