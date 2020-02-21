(function() {

    var actionDao = require('../dao/actionDao');

    module.exports.registerUser = function(userData,callback) {
        actionDao.registerUser(userData,callback);
    };

    module.exports.addVerificationEntry = function(eid,token,callback) {
        actionDao.addVerificationEntry(eid,token,callback);
    };

    module.exports.getVerificationToken = function(eid,callback) {
        actionDao.getVerificationToken(eid,callback);
    };

    module.exports.unblockUser = function(eid,callback) {
        actionDao.unblockUser(eid,callback);
    };

    module.exports.checkUserState = function(email,callback) {
        actionDao.checkUserState(email,callback);
    };

    module.exports.deleteToken = function(eid,callback) {
        actionDao.deleteToken(eid,callback);
    };

    module.exports.fetchUser = function(email,callback) {
        actionDao.fetchUser(email,callback);
    };

    module.exports.fetchSessionTokenById = function(id,callback) {
        actionDao.fetchSessionTokenById(id,callback);
    }

    module.exports.createSession = function(session,callback) {
        actionDao.createSession(session,callback);
    };

    module.exports.getUserById = function(eid,callback) {
        actionDao.getUserById(eid,callback);
    };

})();