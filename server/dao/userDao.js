(function () {

    var connection = require('../configs/connection');
    var commonService = require('../services/commonService');

    module.exports.checkEventValidity = function (hash, callback) {
        try {
            // console.log(hash);
            var query = "select * from events where hash=?";
            connection.query(query, hash, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.checkValidReferal = function (refcode, callback) {
        try {
            // console.log(hash);
            var query = "select * from ebm where refcode=?";
            connection.query(query, [refcode], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };



    module.exports.fetchUserFromAuth = function (auth, callback) {
        try {
            commonService.decodeJWT(auth, function (err, obj) {
                if (err) {
                    callback(err);
                } else {
                    console.log('decoded:', obj);
                    var eid = obj.eid;
                    var query = "select * from users where eid=?";
                    connection.query(query, eid, function (err, data) {
                        callback(err, data);
                    });
                }
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.checkUserAlreadyRegistered = function (ticket, user, callback) {
        try {
            console.log(user.eid);
            var query = "select * from eventregistration where eid=? and event=?";
            connection.query(query, [user.eid, ticket], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.checkRegistration = function (user, callback) {
        try {
            // console.log(user.eid);
            var query = "select * from eventregistration where eid=? and status=2";
            connection.query(query, [user.eid], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.registerUserForEvent = function (reg, callback) {
        try {
            var query = "INSERT into eventregistration set ?";
            connection.query(query, reg, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.getUserfromEmail = function (email, callback) {
        try {
            var query = "select * from users where email=?";
            connection.query(query, email, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.getEventById = function (ticket, callback) {
        try {
            var query = "select * from events where ticketname=?";
            connection.query(query, ticket, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.updatePayment = function (eventid, eid, callback) {
        try {
            var query = "UPDATE eventregistration set status=2 where event=? and eid=?";
            connection.query(query, [eventid, eid], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.updateRefCode = function (refcode, ticketname, user, callback) {
        try {
            var query = "UPDATE eventregistration set referral=? where eid=? and event=?";
            connection.query(query, [refcode, user.eid, ticketname], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.deleteSessions = function (user, callback) {
        try {
            var query = "DELETE from sessions where eid=?";
            connection.query(query, user.eid, function (err, data) {
                callback(err, data);
            });
        } catch (err) {

        }
    };

    module.exports.updateDiscount = function (event, eid, discount, callback) {
        try {
            var query = "UPDATE eventregistration set discount=? where event=? and eid=?";
            connection.query(query, [discount, event, eid], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.addRegDump = function (dump, callback) {
        try {
            var query = "INSERT into regdump set ?";
            connection.query(query, dump, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.deleteToken = function (eid, callback) {
        try {
            var query = "DELETE from mailverifications where eid=?";
            connection.query(query, eid, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.getRegistrationDetails = function (event, eid, callback) {
        try {
            var query = "SELECT * from eventregistration where event=? and eid=?";
            connection.query(query, [event, eid], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.addPointstoEBM = function (refcode, points, callback) {
        try {
            var query = "SELECT * from ebm where refcode=?";
            connection.query(query, refcode, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    if (data.length > 0) {
                        var ebm = data[0];
                        var pts = ebm.count + points;
                        query = "UPDATE ebm set count=? where refcode=?";
                        connection.query(query, [pts, refcode], function (err, data) {
                            callback(err, data);
                        });
                    } else {
                        callback({
                            message: "Invalid referral"
                        });
                    }
                }
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.checkReset = function (email, callback) {
        try {
            var query = "select * from resets where email=?";
            connection.query(query, email, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.updateResetToken = function (email, token, callback) {
        try {
            var query = "UPDATE resets set token=? where email=?";
            connection.query(query, [token, email], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.deleteReset = function (email, callback) {
        try {
            var query = "delete from resets where email=?";
            connection.query(query, [email], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err)
        }
    }

    module.exports.addResetToken = function (email, token, callback) {
        try {
            var obj = {};
            obj.email = email;
            obj.token = token;
            var query = "INSERT into resets set ?";
            connection.query(query, obj, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.fetchToken = function (email, callback) {
        try {
            var query = "select * from resets where email=?";
            connection.query(query, email, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.updatePassword = function (hash, email, callback) {
        try {
            var query = "UPDATE users set password=? where email=?";
            connection.query(query, [hash, email], function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.addPointsToMini = function (refcode, callback) {
        try {
            var query = "select count(eid) as count from eventregistration where referral=? and event=2 and status=2";
            connection.query(query, refcode, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    if (data.length > 0) {
                        var count = data[0].count;
                        var points = 0;
                        if (count <= 25) {
                            points = 2;
                        }
                        if (count > 25 && count <= 50) {
                            points = 5;
                        }
                        if (count > 50 && count <= 100) {
                            points = 10;
                        }
                        if (count > 100) {
                            points = 25;
                        }
                        console.log(points);
                        query = "SELECT * from ebm where refcode=?";
                        connection.query(query, refcode, function (err, data) {
                            if (err) {
                                callback(err);
                            } else {
                                if (data.length > 0) {
                                    var ebm = data[0];
                                    var pts = ebm.count + points;
                                    query = "UPDATE ebm set count=? where refcode=?";
                                    connection.query(query, [pts, refcode], function (err, data) {
                                        callback(err, data);
                                    });
                                } else {
                                    callback({
                                        message: "Invalid referral"
                                    });
                                }
                            }
                        });
                    } else {
                        callback({
                            message: "Unknown error"
                        });
                    }
                }
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.getEventsRegisteredByUser = function (eid, callback) {
        try {
            var query = "select e.cname as event from eventregistration er join events e on er.event=e.id where status=2 and eid=? and checkin=0";
            connection.query(query, eid, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.getEventRegisteredByUser = function (eid, callback) {
        try {
            var query = "select * from eventregistration er join events e on er.event=e.id where status=2 and eid=?";
            connection.query(query, eid, function (err, data) {
                callback(err, data);
            });
        } catch (err) {
            callback(err);
        }
    };

    module.exports.checkinUser = function (eid, callback) {
        try {
            var query = "update eventregistration set checkin=1 where eid=? and status=2";
            connection.query(query, eid, function (err, data) {
                callback(err, data);
            })
        } catch (err) {
            callback(err);
        }
    }

    module.exports.checkinreg = function (email, callback) {
        try {
            var query = "update regdump set checkin=1 where email=?";
            connection.query(query, email, function (err, data) {
                callback(err, data);
            })
        } catch (err) {
            callback(err);
        }
    };

    module.exports.updateStatus = function (eid, event, callback) {
        try {
            var query = "update eventregistration set status=2 where eid=? and event=?";
            connection.query(query, [eid, event], function (err, data) {
                callback(err, data);
            })
        }
        catch (err) {
            callback(err);
        }
    };

    module.exports.updateCheckin = function (eid, event, callback) {
        try {
            var query = "update eventregistration set checkin=1 where eid=? and event=?";
            connection.query(query, [eid, event], function (err, data) {
                callback(err, data);
            })
        }
        catch (err) {
            callback(err);
        }
    }

    module.exports.getHash = function (event, callback) {
        try {
            var query = "select hash from events where id=?";
            connection.query(query, event, function(err, data) {
                callback(err,data);
            })
        }
        catch (err) {
            callback(err);
        }
    }

})();