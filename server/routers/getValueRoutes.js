(function() {

    var express = require('express');
    var router = express.Router();
    var getValueController = require('../controllers/getValueController');

    router.post('/participants',function(req,res) {
        getValueController.getParticipantsByEvent(req,res);
    });

    router.get('/eventsbyuser',function(req,res) {
        getValueController.getEventsByUser(req,res);
    });

    router.get('/getuserreg',function(req,res){
        getValueController.getEventswithReg(req,res)
    })
    
    router.get('/getcount',function(req,res){
        getValueController.getCount(req,res)
    })

    module.exports = router;

})();