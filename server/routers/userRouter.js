(function() {

    var express = require('express');
    var router = express.Router();
    var userController = require('../controllers/userController');


    router.post('/:hash/register',function(req,res) {
        userController.registerEvent(req,res);
    });

    router.post('/:hash/accommodation',function(req,res) {
        userController.registerAccomodation(req,res);
    });

    router.post('/logout',function(req,res) {
        console.log('logout');
        userController.logout(req,res);
    });

    router.get('/getuserdetails', function(req,res){
        userController.getUserDetails(req, res)
    })
    
    router.get('/getregevents', function(req, res) {
        userController.getRegisteredEvents(req,res);
    });

    module.exports = router;

})();