(function() {

    var getValueDao = require('../dao/getValueDao');

    module.exports.getParticipantsByEvent = function(event,callback) {
        getValueDao.getParticipantsByEvent(event,callback);
    };

    module.exports.getEventsByUser = function(email,callback) {
        getValueDao.getEventsByUser(email,callback);
    }

})();