(function () {

    var responseHandler = require('../helpers/responseHandler');
    var privatekey = require('../configs/config.json').private_key;

    module.exports = function (options) {
        var authHandler = function (req, res, next) {
            var auth = req.headers['auth'];
            console.log(req.headers.auth);
            if(auth){
                if(auth === privatekey) {
                    next();
                }
                else {
                    return authHandler.authFailed('Auth failed',res);
                }
            }
            else{
                return authHandler.authFailed('Auth failed',res);
            }
        };
        authHandler.authFailed = function(msg, res){
            var error = new Error(msg);
            error.statusCode = 401;
            responseHandler.error(res, error);
        };
        return authHandler;
    };

})();