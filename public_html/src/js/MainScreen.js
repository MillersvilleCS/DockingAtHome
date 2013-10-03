
(function(window, $) {
    'use strict';

    var MainScreen = function($element) {
        Screen.apply(this, [$element]);

        var pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.set(0, 0, 130);
        this.scene.add(pointLight);

        /* TODO - Remove Temp */
        /*

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
        */

        this.proteinList = undefined;
        this.ligandList = undefined;
        this.buttonHistory = [];
        this.currentProtein = undefined;
        this.currentLigand = undefined;
        this.currentTypePlaced = undefined;
        this.selected = [-1, -1, -1];
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

    MainScreen.prototype.placeModel = function ( response ) {
        console.log(response);
        var molecule = MoleculeGeometryBuilder.load(response, 0.25, 5, 1, 0);
        if( molecule != undefined ) {
            molecule.position = new THREE.Vector3(-1, -1, 0);
            molecule.scale = new THREE.Vector3(0.5, 0.5, 0.5);
        } else {
            /* 
               TODO - Fatal Error - Probably same issue as Molecule Flashcards
               and displaying this error
            */
            alert( 'Error parsing Molecule!' );
        }

        if( this.currentTypePlaced == 'protein' ) {
            if( this.currentProtein != undefined ) {
                this.scene.remove( this.currentProtein );
            }
            this.currentProtein = molecule;
            this.scene.add( this.currentProtein );
        } else {
            if( this.currentLigand != undefined ) {
                this.scene.remove( this.currentLigand );
            }
            this.currentLigand = molecule;
            this.scene.add( this.currentLigand );
        }
    }

    MainScreen.prototype.setModel = function( type ) {
        var dataUrl;
        this.currentTypePlaced = type;
        if( type == 'protein' ) {
            dataUrl = this.proteinList[ this.selected[0] ].pdb_url;
        } else {
            console.log( this.ligandList[ this.selected[1] ].conformation_list[ this.selected[2] ] );
            dataUrl = this.ligandList[ this.selected[1] ].conformation_list[ this.selected[2] ].pdb_url;
        }

        /* TODO - add to JSCommManager so errors and retries work */
        TextLoader.loadText( 'http://exscitech.gcl.cis.udel.edu/' + dataUrl, this.placeModel.bind(this) );
    }

    MainScreen.prototype.setInfo = function( response ) {
        console.log( response );

        this.proteinList = response.protein_list;
        this.ligandList = response.ligand_list;
        UserData.session = response.session_id;

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
            var selected = $(this).data('logic');
            selected = selected.substr(1, selected.length - 1);
            var index = parseInt(selected);
            // TODO - proper screen
            alert(mainScreen.proteinList[index].description);

            return false;//cancel action
        });

        $('#sidebar').on('click', '.button[data-logic]', function() {
            var selected = $(this).data('logic');
            $('#sidebarPanel').addClass('right');
            mainScreen.changeSelected('#s', selected);
            mainScreen.selected[0] = parseInt(selected);
            mainScreen.setModel('protein');
        });

        $('#sidebarPanel').on('click', '.button[data-logic]', function() {
            var selected = $(this).data('logic');
            mainScreen.changeSelected('#sp', selected);
            mainScreen.selected[1] = selected;

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
            var selected = $(this).data('logic');
            mainScreen.changeSelected('#ssp', selected);
            $('#sidebarSecondPanel').removeClass('furtherRight');
            $('#sidebarSecondPanel').addClass('hidden');
            $('#sidebarPanel').removeClass('right');
            mainScreen.selected[2] = (selected + "").substr(1, 1);
            mainScreen.setModel('ligand');
        });
    }

    function disableButtons( ) {

    }

    window.MainScreen = MainScreen;
})(window, jQuery);
