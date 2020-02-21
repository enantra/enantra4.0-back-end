(function() {

    var connection = require('../configs/connection');
    var moment = require('moment');

    module.exports.registerUser = function(userData,callback) {
        try {
            console.log(userData);
            var query = "INSERT into users set ?";
            connection.query(query,userData,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.checkUserState = function(email,callback) {
        try {
            var query = "select * from users where email = ?";
            connection.query(query,[email],function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.addVerificationEntry = function(eid,token,callback) {
        try {
            var js = {};
            js.eid = eid;
            js.token = token;
            js.expiry = moment(moment().add(3,'hours'))*1;
            console.log(js);
            var query = "INSERT into mailverifications set ?";
            connection.query(query,js,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.getVerificationToken = function(eid,callback) {
        try {
            var query = "SELECT * from mailverifications where eid=?";
            connection.query(query,eid,function(err,data) {
                callback(err,data);
            })
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.deleteToken = function(eid,callback) {
        try {
            var query = "DELETE from mailverifications where eid=?";
            connection.query(query,eid,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.unblockUser = function(eid,callback) {
        try {
            var query = "UPDATE users set block=? where eid=?";
            connection.query(query,[0,eid],function(err,data) {
                callback(err,data);
            })
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.fetchUser = function(email,callback) {
        try {
            var query = "SELECT * from users where email=?";
            connection.query(query,email,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.createSession = function(session,callback) {
        try {
            var query = "INSERT into sessions set ?";
            connection.query(query,session,function(err,data) {
                callback(err,data);
            })
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.getUserById = function(eid,callback) {
        try {
            var query = "SELECT * from users where eid=?";
            connection.query(query,eid,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.fetchSessionTokenById = function(id,callback) {
        try {
            var query = "SELECT * from sessions where sessionid=?";
            connection.query(query,id,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.checkMail = function(email,callback) {
        try {
            var query = "select * from users where email=?";
            connection.query(query,email,function(err,data) {
                callback(err,data);
            })
        }
        catch(err) {
            callback(err);
        }
    };


})();