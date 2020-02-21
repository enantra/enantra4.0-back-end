(function () {

    var responseHandler = require('../helpers/responseHandler');
    var getValueService = require('../services/getValueService');
    var getValueDao = require('../dao/getValueDao');
    var userDao = require('../dao/userDao');
    var _ = require('underscore');


    module.exports.getParticipantsByEvent = function (req, res) {
        try {
            if (req.body) {
                console.log(req.body);
                var event = req.body.event;
                getValueService.getParticipantsByEvent(event, function (err, data) {
                    if (err) {
                        responseHandler.error(res, err);
                    } else {
                        if (data.length > 0) {
                            responseHandler.response(res, data);
                        } else {
                            responseHandler.error(res, {
                                message: "Nobody registered for this event"
                            });
                        }
                    }
                });
            } else {
                responseHandler.error(res, {
                    message: "Invalid Body",
                    statusCode: 400
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.getEventsByUser = function (req, res) {
        try {
            if (req.query.email) {
                var email = req.query.email;
                getValueService.getEventsByUser(email, function (err, data) {
                    if (err) {
                        responseHandler.error(res, err);
                    } else {
                        var fdata = [];
                        var eid = "";
                        _.forEach(data, function (item, index) {
                            fdata.push(item.cname);
                            eid = item.eid;
                        });
                        var data = {};
                        data.events = fdata;
                        data.eid = eid;
                        responseHandler.response(res, data);
                    }
                });
            } else {
                responseHandler.error(res, {
                    message: "Invalid request"
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.getEventswithReg = function (req, res) {
        try {
            if (req.query.email) {
                var email = req.query.email;
                getValueService.getEventsByUser(email, function (err, data) {
                    // console.log(email,'email');
                    if (err) {
                        responseHandler.error(res, err);
                    } else {
                        console.log(data, 'data');
                        var fdata = [];
                        var eid = "";
                        _.forEach(data, function (item, index) {
                            fdata.push(item.cname);
                            // email=email;
                        });
                        console.log(fdata, 'fdata');
                        getValueDao.getEventsfromReg(email, function (err, data) {
                            console.log(err, 'err');
                            if (err)
                                responseHandler.error(res, err)
                            else {
                                console.log(data)
                                _.forEach(data, function (item, index) {
                                    fdata.push(item.cname);
                                    email = item.email;
                                });
                                var data = {};
                                data.events = fdata;
                                data.email = email;
                                responseHandler.response(res, data);
                            }
                        })
                    }
                });
            } else {
                responseHandler.error(res, {
                    message: "Invalid request"
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.getCount = function (req, res) {
        try {
            getValueDao.getCount(function (err, data) {
                if (err) {
                    responseHandler.error(res, err)
                } else {
                    responseHandler.response(res,data)
                }
            })
        } catch (e) {

        }
    }

    module.exports.getUserDetails = function (req, res) {
        try {
            var auth = req.headers['auth'];
            if(auth){
                userDao.fetchUserFromAuth(auth, function(err, data){
                    if(err)
                        responseHandler.error(res, err);
                    else    
                        responseHandler.response(res, data);
                });
            } else {
                responseHandler.error(res, { 
                    message : "Please log in"
                })
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    }

})();