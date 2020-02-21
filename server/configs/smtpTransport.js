(function() {

    var nodemailer = require('nodemailer');
    var oauthConf = require('./oauth.json');

    var transport = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 465,
        secure : true,
        pool: true,
        auth : {
            type : "OAuth2",
            user : "enantra.tech@gmail.com",
            pass : "Capitalize2020",
            clientId : oauthConf.web.client_id,
            clientSecret : oauthConf.web.client_secret,
            refreshToken : oauthConf.web.refresh_token
        }
    });

    module.exports = transport;

    
})();