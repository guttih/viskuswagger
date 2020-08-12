

module.exports.errorResponse = function errorResponse(status, message) {

    if (message === undefined) {
        message = module.exports.httpStatusCodeText(status);
    }
    return {
        error: {
            code: status,
            message: message
        }
    };
    
};

module.exports.applicationMissingFieldErrorCodes = function (missingField) {

        switch(missingField) {
             case "id":            return 400001;  break;
             case "title":         return 400002;  break;
             case "description":   return 400003;  break;
             case "owner":         return 400004;  break;
            default:
                return 400000;
        }
};

module.exports.httpStatusCodeText = function (status) {

        switch(status) {
            case 200: return "Ok";           break;
            case 201: return "Created";      break;
            case 204: return "No content";   break;
        
        // application http status code errors
            case 400: return "Bad request";  break;
            case 404: return "Not found";    break;
            case 204: return "No content";   break;
            case 500: return "Server error"; break;

        //server http status code errors
            default : return "Error occurred";
        }

};

module.exports.errorResponseExtended = function (status, message) {

    if (message === undefined) {
        message = module.exports.httpStatusCodeText(status);
    }
    return {
        error: {
            code: status,
            message: message
        },
        errors: []
    };

};
module.exports.successResponse = function successResponse(data) {
        
    return {
        data: data
    };
}

/* 
    Example usage:
        const lib = require('./helpers/lib.js');
        var appPackage = lib.getPackage();
        console.log("Application version:" + appPackage.version);
*/

module.exports.getPackage = function getPackage(){
	var file = __dirname + '/../package.json';
	var conf = require(file);
	
	return conf;
};


/**
 * Verifies if all required properties are in a object 
 *
 * @param {Object} objectToSearch
 * @param {Array.<String>} requiredProperties
 * @returns {Array.<String>} If successful [], If fail array of all properties missing
 */
module.exports.getMissingBodyProperty = function getMissingPropertyProperty(objectToSearch, requiredProperties){
    var ret = [];
    requiredProperties.forEach(property => {
        if (objectToSearch[property] === undefined) {
            ret.push(property);
        }
    });
    return ret;
};

