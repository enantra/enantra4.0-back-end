(function () {

    var responseHandler = require('../helpers/responseHandler');
    var connection = require('../configs/connection');
    var moment = require('moment');
    var actionService = require('../services/actionService');
    var jwt  = require('jsonwebtoken');
    var privatekey = require('../configs/config.json').private_key;

    module.exports = function (options) {
        var authHandler = function (req, res, next) {
            console.log('Auth Handler');
            var auth = req.headers['auth'];
            if(auth){
                try {
                    // console.log(privatekey);
                    var token = jwt.decode(auth,privatekey);
                    // console.log(token);
                    // console.log(moment()*1);
                    // console.log(token.exp*1000);
                    if((token.exp*1000)>(moment()*1)) {
                        console.log('Im here');
                        actionService.fetchSessionTokenById(token.sessionid,function(err,data) {
                            if(err) {
                                return authHandler.authFailed('Something went wrong',res);
                            }
                            else {
                                if(data.length>0) {
                                    var dbToken = data[0];
                                    if(dbToken.token === token.token) {
                                        next();
                                    }
                                    else {
                                        return authHandler.authFailed('Tampered token',res);
                                    }
                                }
                                else {
                                    return authHandler.authFailed('Invalid Token',res);
                                }
                            }
                        });
                    }
                    else {
                        return authHandler.authFailed('Token Expired');
                    }
                }
                catch(err) {
                    console.log('ff');
                    return authHandler.authFailed('Invalid Token',res);
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