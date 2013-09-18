JSCommunicationManager = function () {
    
};

JSCommunicationManager.REQUEST_HANDLER_URL = 'http://docktest.gcl.cis.udel.edu/exscitech_sam/request_handler.php';
JSCommunicationManager.GET_MEDIA_URL = 'http://docktest.gcl.cis.udel.edu/exscitech_sam/get_media.php';
JSCommunicationManager.MEDIA_PDB = 0;
JSCommunicationManager.MEDIA_IMAGE = 1;
JSCommunicationManager.errorCallback = undefined;

JSCommunicationManager.login = function ( email, password , callback) {
    'use strict';
    email = email.toLowerCase ();
    var passwordHash = hex_md5 (password + email);

    var requestObject = {};
    requestObject.request_type = 'login';
    requestObject.email = email;
    requestObject.hash = passwordHash;

    CommunicationManager.post ( JSCommunicationManager.REQUEST_HANDLER_URL, requestObject, callback );
};

JSCommunicationManager.register = function ( email, password , username, callback) {
    'use strict';
    email = email.toLowerCase ();

    var requestObject = {};
    requestObject.request_type = 'register';
    requestObject.email = email;
    requestObject.password = password;
    requestObject.username = username;

    CommunicationManager.post ( JSCommunicationManager.REQUEST_HANDLER_URL, requestObject, callback );
};

JSCommunicationManager.getMedia = function ( gameSessionID, mediaType, questionID, callback ) {
    'use strict';
    var requestObject = {};
    requestObject.gsi = gameSessionID;
    requestObject.mt = mediaType;
    requestObject.qid = questionID;

    CommunicationManager.get ( JSCommunicationManager.GET_MEDIA_URL, requestObject, callback );
};

JSCommunicationManager.error = function ( info ) {
    if(CommunicationManager.retryCount > 0) {
        $('#retryCount').text('Retry attempts: ' + CommunicationManager.retryCount);
    } else {
        $('#retryCount').empty();
    }
    $('#errorCode').text(info.status);
    $('#errorMessage').addClass('in activeTop');

    if( JSCommunicationManager.errorCallback != undefined ) {
        JSCommunicationManager.errorCallback();
    }
};

CommunicationManager.errorCallback = JSCommunicationManager.error;