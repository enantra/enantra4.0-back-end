(function() {

    var nodemailer = require('nodemailer');
    //var oauthConf = require('./oauth.json');

    var transport = nodemailer.createTransport({
        host : "smtp.gmail.com",
        // pool: true,
        port : 587,
        secure : false,
        auth : {
            user : "tsenantra@gmail.com",
            pass : "capitalize2018"
        }
    });

    module.exports = transport;

    
})();