
(function(window, $) {
    'use strict';

    var MainScreen = function($element) {
        Screen.apply(this, [$element]);

        var pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.set(0, 0, 130);
        this.scene.add(pointLight);

        /* TODO - Remove Temp */

        var sphereMaterial =
          new THREE.MeshLambertMaterial(
            {
              color: 0xCC0000
            });

        var sphere = new THREE.Mesh(

          new THREE.SphereGeometry(
            1,
            20,
            20),

          sphereMaterial);

        this.scene.add(sphere);
    };

    MainScreen.prototype = Object.create(Screen.prototype);
    MainScreen.prototype.constructor = MainScreen;

    MainScreen.prototype.onUpdate = function(delta) {

    };

    MainScreen.prototype.onPause = function( ) {

    };

    MainScreen.prototype.onLeave = function( ) {
        disableButtons( );
    };

    MainScreen.prototype.onResume = function( ) {
        enableButtons(this);
        $('#mainUI').addClass('in active');

        JSCommunicationManager.startGame(UserData.auth, this.setInfo.bind(this));
    };

    MainScreen.prototype.setInfo = function( response ) {
        console.log( 'We should store this information in 3 pop-out windows, protein -> ligand -> conformation' );
        console.log( 'Ligand list contains conformation list' );
        console.log( response );
    };

    function enableButtons(mainScreen) {
        $('#sidebar').find('.button[data-logic=\'mainElement\']').on('click', function() {
            //do logic for setting submenu html, and getting which button was selected
            $('#sidebarPanel').addClass('right');
        });

        $('#sidebarPanel').find('.button[data-logic=\'subElement\']').on('click', function() {
            $('#sidebarSecondPanel').removeClass('hidden');
            /* TODO - Better way to always move 202px from current margin-left? */
            $('#sidebarSecondPanel').addClass('furtherRight');
        });

        $('#sidebarSecondPanel').find('.button[data-logic=\'subElement\']').on('click', function() {
            $('#sidebarSecondPanel').removeClass('furtherRight');
            $('#sidebarSecondPanel').addClass('hidden');
            $('#sidebarPanel').removeClass('right');
        });
    }

    function disableButtons( ) {

    }

    window.MainScreen = MainScreen;
})(window, jQuery);
