JSCommunicationManager = function () {
    
};

JSCommunicationManager.REQUEST_HANDLER_URL = 'http://docktest.gcl.cis.udel.edu/jobSubmission/public_html/request_handler.php';
JSCommunicationManager.MEDIA_URL = 'http://exscitech.gcl.cis.udel.edu/';
JSCommunicationManager.MEDIA_PDB = 0;
JSCommunicationManager.MEDIA_IMAGE = 1;
JSCommunicationManager.errorCallback = undefined;

JSCommunicationManager.login = function ( email, password , callback ) {
    'use strict';
    email = email.toLowerCase ();
    var passwordHash = hex_md5 (password + email);

    var requestObject = {};
    requestObject.request_type = 'login';
    requestObject.email = email;
    requestObject.hash = passwordHash;

    CommunicationManager.post ( JSCommunicationManager.REQUEST_HANDLER_URL, requestObject, callback );
};

JSCommunicationManager.register = function ( email, password , username, callback ) {
    'use strict';
    email = email.toLowerCase ();

    var requestObject = {};
    requestObject.request_type = 'register';
    requestObject.email = email;
    requestObject.password = password;
    requestObject.username = username;

    CommunicationManager.post ( JSCommunicationManager.REQUEST_HANDLER_URL, requestObject, callback );
};

JSCommunicationManager.startGame = function ( authenticator, callback ) {
    var requestObject = {};
    requestObject.request_type = 'start_job_submit_game';
    requestObject.authenticator = authenticator;

    CommunicationManager.post ( JSCommunicationManager.REQUEST_HANDLER_URL, requestObject, callback );
};

JSCommunicationManager.createJobObject = function ( proteinID, ligandID, conformationID, rotX, rotY, rotZ, rotPhi ) {
    var jobObject = {};
    jobObject.protein_id = proteinID;
    jobObject.ligand_id = ligandID;
    jobObject.conformation_id = conformationID;
    jobObject.rotation_x = rotX;
    jobObject.rotation_y = rotY;
    jobObject.rotation_z = rotZ;
    jobObject.rotation_phi = rotPhi;

    return jobObject;
};

JSCommunicationManager.submitJob = function ( authenticator, sessionID, jobParameters, callback ) {
    var requestObject = {};
    requestObject.request_type = 'submit_job';
    requestObject.authenticator = authenticator;
    requestObject.session_id = sessionID;
    requestObject.job_parameters = jobParameters;

    CommunicationManager.post ( JSCommunicationManager.REQUEST_HANDLER_URL, requestObject, callback );
};

JSCommunicationManager.get = function ( subUrl, callback ) {
    'use strict';
    var requestObject = {};

    CommunicationManager.get ( JSCommunicationManager.MEDIA_URL + subUrl, requestObject, callback );
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