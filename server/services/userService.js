(function() {

    var userDao = require('../dao/userDao');

    module.exports.checkEventValidity  = function(hash,callback) {
        userDao.checkEventValidity(hash,callback);
    };

    module.exports.fetchUserFromAuth = function(auth,callback) {
        userDao.fetchUserFromAuth(auth,callback);
    };

    module.exports.checkUserAlreadyRegistered = function(ticket,user,callback) {
        userDao.checkUserAlreadyRegistered(ticket,user,callback);
    };

    module.exports.registerUserForEvent = function(reg,callback) {
        userDao.registerUserForEvent(reg,callback);
    };

    module.exports.checkRegistration = function(user,callback) {
        userDao.checkRegistration(user,callback);
    };

    module.exports.getUserfromEmail = function(email,callback) {
        userDao.getUserfromEmail(email,callback);
    };

    module.exports.getEventsRegisteredByUser = function(eid,callback) {
        userDao.getEventsRegisteredByUser(eid,callback);
    };

    module.exports.getEventRegisteredByUser = function(eid,callback) {
        userDao.getEventRegisteredByUser(eid,callback);
    };

    module.exports.getEventById = function(ticket,callback) {
        userDao.getEventById(ticket,callback);
    };


    module.exports.checkValidReferal = function(refcode,callback) {
        userDao.checkValidReferal(refcode,callback);
    };

    module.exports.updateDiscount = function(event,eid,discount,callback) {
        userDao.updateDiscount(event,eid,discount,callback);
    }

    module.exports.updatePayment = function(eventid,eid,callback) {
        userDao.updatePayment(eventid,eid,callback);
    };

    module.exports.updateRefCode = function(refcode,ticketname,user,callback) {
        userDao.updateRefCode(refcode,ticketname,user,callback);
    };

    module.exports.updateStatus = function(eid,event,callback) {
        userDao.updateStatus(eid,event,callback);
    };

    module.exports.deleteSessions = function(user,callback) {
        userDao.deleteSessions(user,callback);
    };

    module.exports.addRegDump = function(dump,callback) {
        userDao.addRegDump(dump,callback);
    };

    module.exports.deleteToken = function(eid,callback) {
        userDao.deleteToken(eid,callback);
    };

    module.exports.getRegistrationDetails = function(event,eid,callback) {
        userDao.getRegistrationDetails(event,eid,callback);
    };

    module.exports.addPointstoEBM = function(refcode,points,callback) {
        userDao.addPointstoEBM(refcode,points,callback);
    };

    module.exports.checkReset = function(email,callback) {
        userDao.checkReset(email,callback);
    };

    module.exports.updateResetToken = function(email,token,callback) {
        userDao.updateResetToken(email,token,callback);
    };

    module.exports.addResetToken = function(email,token,callback) {
        userDao.addResetToken(email,token,callback);
    };

    module.exports.fetchToken = function(email,callback) {
        userDao.fetchToken(email,callback);
    };

    module.exports.deleteReset = function (email,callback) {
        userDao.deleteReset(email,callback);
    }

    module.exports.updatePassword = function(hash,email,callback) {
        userDao.updatePassword(hash,email,callback);
    };

    module.exports.addPointsToMini = function(refcode,callback) {
        userDao.addPointsToMini(refcode,callback);
    };

    module.exports.checkinUser = function(eid,callback) {
        userDao.checkinUser(eid,callback);
    };

    module.exports.getHash = function(event, callback) {
        userDao.getHash(event,callback);
    }

})();