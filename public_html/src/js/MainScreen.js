
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

        this.proteinList = undefined;
        this.ligandList = undefined;
        this.buttonHistory = [];
    };

    var SIDEBAR_HTML = "<div id='$index' class='button sidebarElement protein' data-logic='$id'><b>$name</b>" +
                       "<div class='description'>Disease: $disease<br><span class='descriptionLink' " + 
                       "data-logic='$did'>View Description</span></div></div>";
    var SIDEBAR_PANEL_HTML = "<div id='$index' class='button sidebarElement' data-logic='$id'>$name</div>";

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
        console.log( response );

        this.proteinList = response.protein_list;
        this.ligandList = response.ligand_list;

        $('#sidebar').html("<h2 class='sidebarTitle'>Protein</h2>");
       for(var i = 0; i < this.proteinList.length; i++) {
            insertInfo(
                {
                    '$index': 's' + i,
                    '$id': i, 
                    '$name': this.proteinList[i].name,
                    '$description': this.proteinList[i].description,
                    '$did': 'd' + i,
                    '$disease': this.proteinList[i].disease
                }, SIDEBAR_HTML, '#sidebar');
        }

        $('#sidebarPanel').html("<h2 class='sidebarTitle'>Ligand</h2>");
        for(var i = 0; i < this.ligandList.length; i++) {
            insertInfo(
                {
                    '$index': 'sp' + i,
                    '$id': i, 
                    '$name': this.ligandList[i].name
                }, SIDEBAR_PANEL_HTML, '#sidebarPanel');
        }
    };

    MainScreen.prototype.changeSelected = function(type, id) {
        for(var i = 0; i < this.buttonHistory.length; i++) {
            if(this.buttonHistory[i].type == type) {
                $(type + this.buttonHistory[i].id).removeClass('selected');
                this.buttonHistory.splice(i, 1);
                break;
            }
        }
        this.buttonHistory.push(
                {
                    type: type,
                    id: id
                }
            );
        $(type + id).addClass('selected');
    };

    MainScreen.prototype.reselect = function( type ) {
        this.buttonHistory.forEach(function(history) {
            if(type == history.type) {
                $(type + history.id).addClass('selected');
            }
        });
    };

    /* TODO: Keep private function here? */
    function insertInfo(replacements, templateString, selector) {
        var result = templateString;
        for(var key in replacements) {
            result = result.replace(key, replacements[key]);
        }

        $(selector).append(result);
    }

    function enableButtons(mainScreen) {
        $('#sidebar').on('click', '.descriptionLink[data-logic]', function() {
            // TODO - proper screen
            var selected = $(this).data('logic');
            selected = selected.substr(1, selected.length - 1);
            var index = parseInt(selected);
            alert(mainScreen.proteinList[index].description);

            return false;//cancel action
        });

        $('#sidebar').on('click', '.button[data-logic]', function() {
            $('#sidebarPanel').addClass('right');
            mainScreen.changeSelected('#s', $(this).data('logic'));
        });

        $('#sidebarPanel').on('click', '.button[data-logic]', function() {
            var selected = $(this).data('logic');
            mainScreen.changeSelected('#sp', selected);

            $('#sidebarSecondPanel').html("<h2 class='sidebarTitle'>Conformation</h2>");
            var conformList = mainScreen.ligandList[selected].conformation_list;
            for(var i = 0; i < conformList.length; i++) {
                insertInfo(
                    {
                        '$index': 'ssp' + selected + "" + i,
                        '$id': selected + "" + i, 
                        '$name': conformList[i].id
                    }, SIDEBAR_PANEL_HTML, '#sidebarSecondPanel');
            }
            mainScreen.reselect('#ssp');

            $('#sidebarSecondPanel').removeClass('hidden');
            /* TODO - Better way to always move 202px from current margin-left? */
            $('#sidebarSecondPanel').addClass('furtherRight');
        });

        $('#sidebarSecondPanel').on('click', '.button[data-logic]', function() {
            mainScreen.changeSelected('#ssp', $(this).data('logic'));
            $('#sidebarSecondPanel').removeClass('furtherRight');
            $('#sidebarSecondPanel').addClass('hidden');
            $('#sidebarPanel').removeClass('right');
        });
    }

    function disableButtons( ) {

    }

    window.MainScreen = MainScreen;
})(window, jQuery);
