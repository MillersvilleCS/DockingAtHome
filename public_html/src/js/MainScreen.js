
(function(window, $) {
    'use strict';

    var MainScreen = function($element) {
        Screen.apply(this, [$element]);

        var pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.set(0, 0, 130);
        this.scene.add(pointLight);

        this.proteinList = undefined;
        this.ligandList = undefined;
        this.currentProtein = undefined;
        this.currentLigand = undefined;
        this.currentTypePlaced = undefined;
        this.selected = [-1, -1, -1, -1];//protein, ligand, conformation, ligand associated with conformation
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
        $('#mainUI').removeClass('in active');
    };

    MainScreen.prototype.onResume = function( ) {
        enableButtons(this);
        $('#mainUI').addClass('in active');

        JSCommunicationManager.startGame(UserData.auth, this.setInfo.bind(this));
    };

    MainScreen.prototype.placeModel = function ( response ) {
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
    };

    MainScreen.prototype.setModel = function( type ) {
        var dataUrl;
        this.currentTypePlaced = type;
        /* - Hardcoding Demo
        if( type == 'protein' ) {
            dataUrl = this.proteinList[ this.selected[0] ].pdb_url;
        } else {
            dataUrl = this.ligandList[ this.selected[1] ].conformation_list[ this.selected[2] ].pdb_url;
        }

        JSCommunicationManager.get( dataUrl, this.placeModel.bind(this) );
        */
        if(type == 'protein') {
            TextLoader.loadText( 'res/tempMolecules/1AJX.pdb', this.placeModel.bind(this) );
        } else {
            TextLoader.loadText( 'res/tempMolecules/CID_444290.sdf', this.placeModel.bind(this) );
        }
        
    };

    MainScreen.prototype.setInfo = function( response ) {
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

    MainScreen.prototype.setSelected = function ( type, newValue ) {
        var index;
        if( type == '#s' ) {
            index = 0;
        } else if( type == '#sp' ) {
            index = 1;
        } else {
            index = 2;
        }

        if(this.selected[index] != -1) {
            $(type + this.selected[index]).removeClass('selected');
        }
        this.selected[index] = newValue;
        $(type + newValue).addClass('selected');
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
            mainScreen.setSelected('#s', selected);
            mainScreen.setModel('protein');
        });

        $('#sidebarPanel').on('click', '.button[data-logic]', function() {
            var selected = $(this).data('logic');
            mainScreen.setSelected('#sp', selected);

            $('#sidebarSecondPanel').html("<h2 class='sidebarTitle'>Conformation</h2>");
            var conformList = mainScreen.ligandList[selected].conformation_list;
            for(var i = 0; i < conformList.length; i++) {
                insertInfo(
                    {
                        '$index': 'ssp' + i,
                        '$id': i, 
                        '$name': conformList[i].id
                    }, SIDEBAR_PANEL_HTML, '#sidebarSecondPanel');
            }
            if(selected == mainScreen.selected[3]) { //if we are viewing the ligand page associated with the selected conformation
                mainScreen.setSelected('#ssp', mainScreen.selected[2]);//then re-select
            }

            $('#sidebarSecondPanel').removeClass('hidden');
            /* TODO - Better way to always move 202px from current margin-left? */
            $('#sidebarSecondPanel').addClass('furtherRight');
        });

        $('#sidebarSecondPanel').on('click', '.button[data-logic]', function() {
            var selected = $(this).data('logic');
            $('#sidebarSecondPanel').removeClass('furtherRight');
            $('#sidebarSecondPanel').addClass('hidden');
            $('#sidebarPanel').removeClass('right');
            mainScreen.setSelected('#ssp', selected);
            mainScreen.selected[3] = mainScreen.selected[1];//make this ligand associated with the current conformation
            mainScreen.setModel('ligand');
        });

        $('#mainUI').find('.button[data-logic=\'submitJob\']').on('click', function() {
            /* TODO - Do Submission */

            //if success
            mainScreen.$element.trigger(new ScreenChangeEvent('result'));
        });
    }

    function disableButtons( ) {
        $('#sidebar').off('click');
        $('#sidebarPanel').off('click');
        $('#sidebarSecondPanel').off('click');
        $('#mainUI').off('click');
    }

    window.MainScreen = MainScreen;
})(window, jQuery);
