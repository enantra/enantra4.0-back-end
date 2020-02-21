(function() {

    var express = require('express');
    var router = express.Router();
    var actionController = require('../controllers/actionController');
    var moment = require('moment');
    var qrcode = require('qrcode');
    var userController = require('../controllers/userController');

    router.get('/test',function(req,res) {
        qrcode.toDataURL('Hello',function(err,url) {
            res.send(url);
        });
    });

    router.post('/signup',function(req,res) {
        actionController.registerUser(req,res);
    });

    router.get('/verify',function(req,res) {
        actionController.verifyEmail(req,res);
    });

    router.post('/login',function(req,res) {
        actionController.login(req,res);
    });

    router.post('/webhook',function(req,res) {
        console.log(req.body);
        userController.handleHook(req,res);
    });

    router.get('/checkinuser',function(req,res) {
        userController.checkinUser(req,res);
    })

    router.post('/resendtoken',function(req,res) {
        console.log(req.body);
        userController.resendToken(req,res);
    });

    router.post('/forgetpassword',function(req,res) {
        userController.forgotPassword(req,res);
    });

    router.post('/reset',function(req,res) {
        userController.resetPassword(req,res);
    });

    router.post('/hospidesk',function(req,res) {
        actionController.hospiLogins(req,res);
    });

    router.post('/onspot',function(req,res) {
        actionController.onSpotRegistration(req,res);
    });

    router.get('/hospi/checkmail',function(req,res) {
        actionController.checkMail(req,res);
    });

    router.post('/qrscan',function(req,res) {
        actionController.QRscan(req,res);
    });


    router.get('/hospi/checkuserreg',function(req,res) {
        userController.checkwithreg(req,res);
    });

    router.post('/hospi/onspotSignup',function(req,res) {
        actionController.onSpotSignup(req,res);
    });

    module.exports = router;

})();