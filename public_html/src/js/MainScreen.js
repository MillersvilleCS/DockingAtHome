
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
    };

    function enableButtons(mainScreen) {
        $('#sidebar').find('.button[data-logic=\'test\']').on('click', function() {
            if( $('#sidebarPanel').hasClass('right') ) {
                $('#sidebarPanel').removeClass('right');
            } else  {
                $('#sidebarPanel').addClass('right');
            }
        });
    }

    function disableButtons( ) {

    }

    window.MainScreen = MainScreen;
})(window, jQuery);
