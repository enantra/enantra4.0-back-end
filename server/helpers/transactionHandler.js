(function() {

    var connection = require('../configs/connection');
    var responseHandler = require('../helpers/responseHandler');

    module.exports = {
        beginTransaction : function(callback) {
            connection.beginTransaction(function(err) {
                callback(err);
            });
        },
        rollback : function(res,err) {
            connection.rollback(function(rollErr) {
                if(rollErr) {
                    responseHandler.error(res,rollErr);
                }
                else {
                    responseHandler.error(res,err);
                }
            });
        },
        commit : function(res,data) {
            connection.commit(function(commitErr) {
                if(commitErr) {
                    connection.rollback(function(rollErr) {
                        if(rollErr) {
                            responseHandler.error(res,rollErr);
                        }
                        else {
                            responseHandler.error(res,commitErr);
                        }
                    });
                }
                else {
                    responseHandler.response(res,data);
                }
            })
        }
    }

})();