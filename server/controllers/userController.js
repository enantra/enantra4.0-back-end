(function () {

    var userService = require('../services/userService');
    var responseHandler = require('../helpers/responseHandler');
    var transactionHandler = require('../helpers/transactionHandler');
    var config = require('../configs/config.json');
    var eventcode = config.event_code.test;
    var commonService = require('../services/commonService');
    var actionService = require('../services/actionService');
    var userDao = require('../dao/userDao');
    var hostConfig = config.prod.host;
    var mailService = require('../services/mailService');
    var paymentHandler = require('../helpers/paymentHandler');

    module.exports.registerEvent = function (req, res) {
        try {
            var auth = req.headers['auth'];
            // console.log(auth);
            var hash = req.params.hash;
            // if (req.body) {
                // if (req.body.event) {
                    var eventid = hash;
                    // var refcode = req.body.event.refcode || "admin";
                    var refcode = "admin";
                    userService.checkEventValidity(eventid, function (err, data) {
                        if (err) {
                            responseHandler.error(res, err);
                        } else {
                            if (data.length > 0) {
                                var event = data[0];
                                console.log('event:', event);
                                var ticketname = event.id;
                                userService.fetchUserFromAuth(auth, function (err, user) {
                                    if (err) {
                                        responseHandler.error(res, {
                                            message: 'Unexpected error 1'
                                        });
                                    } else {
                                        userService.checkUserAlreadyRegistered(ticketname, user = user[0], function (err, data) {
                                            if (err) {
                                                responseHandler.error(res, {
                                                    message: 'Unexpected error 2'
                                                });
                                            } else {
                                                // console.log(refcode, 'data');
                                                if (data.length) {
                                                    console.log(data[0], 'data.length');
                                                    if (data[0].status !== 2) {
                                                        userService.checkValidReferal(refcode, function (err, data) {
                                                            if (err) {
                                                                responseHandler.error(res, {
                                                                    message: 'Invalid Referal Code 1'
                                                                });
                                                            } else {
                                                                if (data.length) {
                                                                    // console.log(data[0], 'data[0]');
                                                                    userService.updateRefCode(refcode, ticketname, user, function (err, data) {
                                                                        if (err) {
                                                                            responseHandler.error(res, {
                                                                                message: 'Referal code is invalid'
                                                                            });
                                                                        } else {
                                                                            user.hash = eventid;
                                                                            user.eventName = event.eventname;
                                                                            // var link = `https://www.townscript.com/e/${event.eventname}/booking?${event.ticketname}=1&name=${user.name}&emailid=${user.email}`;
                                                                            // responseHandler.response(res, link);
                                                                            paymentHandler.doPayment(req, res, user, function (data) {
                                                                                console.log(data);
                                                                                responseHandler.response(res, data);
                                                                            });
                                                                        }
                                                                    });
                                                                } else {
                                                                    responseHandler.error(res, {
                                                                        message: 'Invalid Referal Code 2'
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    } else {
                                                        responseHandler.error(res, {
                                                            message: "User Already Registered for this event",
                                                            statusCode: 420
                                                        });
                                                    }
                                                } else {
                                                    // var link = `https://www.townscript.com/e/${event.eventname}/booking?${event.ticketname}=1&name=${user.name}&emailid=${user.email}`;
                                                    var reg = {};
                                                    reg.event = event.id;
                                                    reg.eid = user.eid;
                                                    reg.referral = refcode || "admin";
                                                    // console.log(reg, 'reg');
                                                    userService.checkValidReferal(reg.referral, function (err, data) {
                                                        if (err) {
                                                            console.log(err, 'err');
                                                            responseHandler.error(res, {
                                                                message: 'Invalid Referal Code 3'
                                                            });
                                                        } else {
                                                            // console.log(data, 'data');
                                                            if (data.length) {
                                                                userService.registerUserForEvent(reg, function (err, data) {
                                                                    if (err) {
                                                                        responseHandler.error(res, {
                                                                            message: 'Unexpected error 3'
                                                                        });
                                                                    } else {
                                                                        //res.redirect(link);
                                                                        user.hash = eventid;
                                                                        paymentHandler.doPayment(req, res, user, function (data) {
                                                                            console.log(data);
                                                                            responseHandler.response(res, data);
                                                                        });
                                                                    }
                                                                });
                                                            } else {
                                                                responseHandler.error(res, {
                                                                    message: 'Invalid Referal Code 4'
                                                                })
                                                            }
                                                        }
                                                    })
                                                    //console.log(reg);

                                                }
                                            }
                                        });
                                    }
                                });
                            } else {
                                responseHandler.error(res, {
                                    message: "Invalid Event",
                                    statusCode: 420
                                });
                            }
                        }
                    });
                /*
                } else {
                    responseHandler.error(res, {
                        message: "Bad Input",
                        statusCode: 400
                    });
                }
                */
            /*
            } else {
                responseHandler.error(res, {
                    message: "Bad Input",
                    statusCode: 400
                });
            }
            */
        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.handleHook = function (req, res) {
        try {
            // var hook = JSON.parse(req.body);
            hook = req.body;
            console.log(hook);
            /*

            STRUCTURE OF HOOK

            {
                "totalFare":4.28,
                "ticketId":"EY5T3QE",
                "ticketItems":[
                    {
                        "programName":"Ethical Hacking",
                        "subProgramName":"Tecnical",
                        "fare":1,
                        "attendee":{
                            "name":"Saurabh Kumar",
                            "email":"saurabh@thecollegefever.com",
                            "phone":"0987654321",
                            "college":"FGIET",
                            "sex":"MALE"
                        }
                    },
                    {
                        "programName":"Ethical Hacking",
                        "subProgramName":"Tecnical",
                        "fare":1,
                        "attendee":{
                            "name":"Saurabh Kumar",
                            "email":"saurabh@thecollegefever.com",
                            "phone":"0987654321",
                            "college":"FGIET",
                            "sex":"MALE"
                        }
                    }
                ]
            }
*/
            //console.log(hook.totalFare);
            userService.getUserfromEmail(hook.ticketItems[0].attendee.email, function (err, data) {
                if (err) {
                    console.log('1', err.message);
                    responseHandler.error(res, err);
                } else {
                    if (data.length > 0) {
                        var user = data[0];
                        userService.getEventById(hook.ticketItems[0].subProgramName, function (err, data) {
                            if (err) {
                                console.log('2', err.message);
                                responseHandler.error(res, err);
                            } else {
                                if (data.length > 0) {
                                    var event = data[0];
                                    console.log(event.id);
                                    console.log(user.eid);
                                    userService.updatePayment(event.id, user.eid, function (err, data) {
                                        if (err) {
                                            console.log('3', err.message);
                                            responseHandler.error(res, err);
                                        } else {
                                            userService.getRegistrationDetails(event.id, user.eid, function (err, data) {
                                                if (err) {
                                                    responseHandler.error(res, err);
                                                } else {
                                                    if (data.length > 0) {
                                                        var reg = data[0];
                                                        var refcode = reg.referral;
                                                        var points = event.points;
                                                        
                                                        userService.addPointstoEBM(refcode, points, function (err, data) {
                                                            if (err) {
                                                                responseHandler.error(res, err);
                                                            } else {
                                                                console.log("Ticket booked");
                                                                var payload = {};
                                                                payload.email = user.email;
                                                                payload.event = event.ticketname;
                                                                payload.name = user.name;
                                                                payload.ticketId = hook.ticketId;
                                                                payload.totalFare = hook.totalFare;

                                                                mailService.sendPaymentConfirmation(payload, function (err, data) {
                                                                    if(err)
                                                                        responseHandler.error(res,err);
                                                                    else{
                                                                        responseHandler.response(res, {
                                                                            message: "Registration Success",
                                                                            statusCode: 200
                                                                        });
                                                                    }
                                                                });            
                                                            }
                                                        });
                                                    } else {
                                                        var dump = {};
                                                        dump.email = user.email;
                                                        dump.name = user.name;
                                                        dump.ticketname = event.ticketname;
                                                        dump.discount = '0';
                                                        userService.addRegDump(dump, function (err, data) {
                                                            if (err) {
                                                                responseHandler.error(res, err);
                                                            } else {
                                                                console.log("Inserted to dump 1");
                                                                responseHandler.response(res, {
                                                                    message: "Dumped Successful"
                                                                });
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    responseHandler.error(res, {
                                        message: "Invalid Event",
                                        statusCode: 420
                                    });
                                }
                            }
                        });
                    } else {
                        //responseHandler.error(res,{message:"Invalid User",statusCode:420});
                        var dump = {};
                        dump.email = user.email;
                        dump.name = user.name;
                        dump.ticketname = event.ticketname;
                        dump.discount = '0';
                        userService.addRegDump(dump, function (err, data) {
                            if (err) {
                                responseHandler.error(res, err);
                            } else {
                                console.log("Inserted to dump 2");
                                responseHandler.response(res, {
                                    message: "Dumped Successful"
                                });
                            }
                        });
                    }
                }
            });
        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.logout = function (req, res) {
        try {
            var auth = req.headers['auth'];
            console.log(auth);
            commonService.decodeJWT(auth, function (err, user) {
                if (err) {
                    responseHandler.error(res, err);
                } else {
                    console.log('user:', user);
                    userService.deleteSessions(user, function (err, data) {
                        if (err) {
                            responseHandler.error(res, err);
                        } else {
                            responseHandler.response(res, data);
                        }
                    });
                }
            });
        } catch (err) {
            console.log(err);
            responseHandler.error(res, err);
        }
    };

    module.exports.resendToken = function (req, res) {
        try {
            if (req.body) {
                if (req.body.email) {
                    var email = req.body.email;
                    transactionHandler.beginTransaction(function (err) {
                        if (err) {
                            responseHandler.error(res, err);
                        } else {
                            userService.getUserfromEmail(email, function (err, data) {
                                if (err) {
                                    transactionHandler.rollback(res, err);
                                } else {
                                    if (data.length > 0) {
                                        var user = data[0];
                                        console.log(user, 'user');
                                        if (!user.block) {
                                            transactionHandler.rollback(res, {
                                                message: `User already verified. Try logging in again`
                                            });
                                        } else {
                                            userService.deleteToken(user.eid, function (err, data) {
                                                if (err) {
                                                    transactionHandler.rollback(res, err);
                                                } else {
                                                    commonService.generateToken(40, "", function (err, token) {
                                                        if (err) {
                                                            transactionHandler.rollback(res, err);
                                                        } else {
                                                            actionService.addVerificationEntry(user.eid, token, function (err, data) {
                                                                if (err) {
                                                                    transactionHandler.rollback(res, err);
                                                                } else {
                                                                    var link = "https://enantra.org/api/verify?eid=" + user.eid + "&&token=" + token;
                                                                    mailService.sendVerificationLink(link, email, function (err, data) {
                                                                        if (err) {
                                                                            transactionHandler.rollback(res, err);
                                                                        } else {
                                                                            console.log(data);
                                                                            transactionHandler.commit(res, data);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    } else {
                                        transactionHandler.rollback(res, {
                                            message: "User not registered",
                                            statusCode: 420
                                        });
                                    }
                                }
                            });
                        }
                    });
                } else {
                    responseHandler.error(res, {
                        message: "Specify an email",
                        statusCode: 400
                    });
                }
            } else {
                responseHandler.error(res, {
                    message: "Bad Input",
                    statusCode: 400
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.forgotPassword = function (req, res) {
        try {
            var email = req.body.user.email;
            if (email) {
                userService.getUserfromEmail(email, function (err, data) {
                    if (err) {
                        responseHandler.error(res, err);
                    } else {
                        if (data.length > 0) {
                            if (data[0].block) {
                                responseHandler.error(res, {
                                    message: "User not verified.Click <a href='/userstate>here</a> to get verification link.'",
                                    statusCode: 420
                                });
                            } else {
                                commonService.generateToken(30, "", function (err, token) {
                                    if (err) {
                                        responseHandler.error(res, {});
                                    } else {
                                        userService.checkReset(email, function (err, data) {
                                            if (err) {
                                                responseHandler.error(res, {});
                                            } else {
                                                if (data.length > 0) {
                                                    userService.updateResetToken(email, token, function (err, data) {
                                                        if (err) {
                                                            // console.log(err,'err');
                                                            responseHandler.error(res, err);
                                                        } else {
                                                            var link = `https://enantra.org/resetpassword?email=${email}&token=${token}`;
                                                            mailService.sendResetLink(email, link, function (err, data) {
                                                                if (err) {
                                                                    responseHandler.error(res, {
                                                                        message: 'Please enter a valid email address.'
                                                                    });
                                                                } else {
                                                                    responseHandler.response(res, data);
                                                                }
                                                            });
                                                        }
                                                    });
                                                } else {
                                                    userService.addResetToken(email, token, function (err, data) {
                                                        if (err) {
                                                            responseHandler.error(res, {
                                                                message: 'Unexpected error'
                                                            });
                                                        } else {
                                                            var link = `https://enantra.org/resetpassword?email=${email}&token=${token}`;
                                                            mailService.sendResetLink(email, link, function (err, data) {
                                                                if (err) {
                                                                    responseHandler.error(res, {
                                                                        message: 'Please enter a valid email address.'
                                                                    });
                                                                } else {
                                                                    responseHandler.response(res, data);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        } else {
                            responseHandler.error(res, {
                                message: "User not registered.Click <a href='/signup'>here</a> to register.",
                                statusCode: 420
                            });
                        }
                    }
                });
            } else {
                responseHandler.error(res, {
                    message: "Please enter a valid email",
                    statusCode: 400
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.resetPassword = function (req, res) {
        try {
            if (req.body) {
                if (req.body.user) {
                    var reset = req.body.user;
                    console.log(reset, 'reset');
                    userService.fetchToken(reset.email, function (err, data) {
                        if (err) {
                            responseHandler.error(res, {
                                message: 'Unexpected error'
                            });
                        } else {
                            if (data.length > 0) {
                                var dbReset = data[0];
                                if (dbReset.token === reset.token) {
                                    commonService.generatePasswordHash(reset.password, function (err, hash) {
                                        if (err) {
                                            responseHandler.error(res, {
                                                message: 'Unexpected error'
                                            });
                                        } else {
                                            userService.updatePassword(hash, reset.email, function (err, data) {
                                                if (err) {
                                                    responseHandler.error(res, {
                                                        message: 'Unexpected error'
                                                    });
                                                } else {
                                                    userService.deleteReset(reset.email, function (err, data) {
                                                        responseHandler.response(res, {});
                                                    })
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    responseHandler.error(res, {
                                        message: "Invalid link"
                                    });
                                }
                            } else {
                                responseHandler.error(res, {
                                    message: "Invalid Link"
                                });
                            }
                        }
                    })
                } else {
                    responseHandler.error(res, {
                        message: "Bad Input",
                        statusCode: 400
                    });
                }
            } else {
                responseHandler.error(res, {
                    message: "Bad Input",
                    statusCode: 400
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    }

    module.exports.registerAccomodation = function (req, res) {
        try {
            var auth = req.headers['auth'];
            var acc = req.params.hash;

            if(acc < 1 || acc > 2){
                responseHandler.error(res, {
                    message : 'Not a valid accomodation day'
                })
            }

            var accConfig = config.acc;
            if (acc) {
                userService.fetchUserFromAuth(auth, function (err, user) {
                    if (err) {
                        responseHandler.error(res, {
                            message: 'Unexpected error'
                        });
                    } else {
                        if (user.length) {
                            user = user[0];
                            var refcode = 'admin';
                            console.log(acc)
                            console.log(accConfig)
                            console.log(accConfig[acc].ticket, 'accConfig[acc].ticket');
                            var ticketname = accConfig[acc].ticket[user.gender].eventid;
                            var eventid = accConfig[acc].ticket[user.gender].hash;
                            if (user.gender === 1 || user.gender === 2) {
                                userService.checkRegistration(user, function (err, data) {
                                    if (err)
                                        responseHandler.error(res, '');
                                    else {
                                        if (data.length) {
                                            userService.checkUserAlreadyRegistered(ticketname, user, function (err, data) {
                                                /*
                                                userService.getHash(ticketname, function(err,data) {
                                                    if(err)
                                                        responseHandler.error(res,'');
                                                    eventid = data;
                                                })
                                                */
                                                if (data.length) {
                                                    if (data[0].status !== 2) {
                                                        if (data.length) {
                                                            // console.log(data[0], 'data[0]');                                                          
                                                            // var link = `https://www.townscript.com/e/${accEvent}/booking?${accTicket}=1&name=${user.name}&emailid=${user.email}`;
                                                            // responseHandler.response(res, link);
                                                            user.hash = eventid;
                                                            paymentHandler.doPayment(req, res, user);
                                                        } else {
                                                            responseHandler.error(res, {
                                                                message: 'Invalid action'
                                                            })
                                                        }
                                                    } else {
                                                        responseHandler.error(res, {
                                                            message: "User Already Registered for this event",
                                                            statusCode: 420
                                                        });
                                                    }
                                                } else {
                                                    // var link = `https://www.townscript.com/e/${accEvent}/booking?${accTicket}=1&name=${user.name}&emailid=${user.email}`;
                                                    var reg = {};
                                                    reg.event = ticketname;
                                                    reg.eid = user.eid;
                                                    reg.referral = "admin";
                                                    userService.registerUserForEvent(reg, function (err, data) {
                                                        if (err) {
                                                            responseHandler.error(res, {
                                                                message: 'Unexpected error'
                                                            });
                                                        } else {
                                                            //res.redirect(link);
                                                            user.hash = eventid;
                                                            paymentHandler.doPayment(req, res, user);
                                                        }
                                                    });

                                                }
                                            })
                                        } else {
                                            responseHandler.error(res, {
                                                message: 'You should register for atleast one event to avail accomodation'
                                            });
                                        }
                                    }
                                })
                            } else {
                                responseHandler.error(res, {
                                    message: "Please contact out Technical team for your registartion",
                                    statusCode: 400
                                });
                            }
                        } else {
                            responseHandler.error(res, {
                                message: "Invalid action",
                                statusCode: 400
                            });
                        }
                    }
                });
            } else {
                responseHandler.error(res, {
                    message: "Bad Input",
                    statusCode: 400
                });
            }

        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.checkinUser = function (req, res) {
        try {
            var eid = req.query.eid;
            if (eid) {
                userService.checkinUser(eid, function (err, data) {
                    if (err) {
                        console.log(err);
                        responseHandler.error(res, err);
                    } else {
                        console.log(data);
                        responseHandler.response(res, data);
                    }
                })
            } else {
                console.log(err);
                responseHandler.error(res, {
                    message: "No eid mentioned"
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    }

    module.exports.checkwithreg = function (req, res) {
        try {
            let email = req.query.email;
            if (email) {
                console.log(email, 'email');
                userDao.getUserfromEmail(email, function (err, data) {
                    if (err) {
                        console.log(err);
                        responseHandler.error(res, err);
                    } else {
                        // console.log(data);
                        if (data.length) {
                            eid = data[0].eid;
                            userDao.checkinUser(eid, function (err, data) {
                                if (err) {
                                    console.log(err, 'err');
                                    responseHandler.error(res, err);
                                } else {
                                    userDao.checkinreg(email, function (err, data) {
                                        if (err) {
                                            console.log(err, 'err');
                                            responseHandler.error(res, err);
                                        } else
                                            responseHandler.response(res, {
                                                message: "Checkin successful"
                                            })
                                    })
                                }
                            })
                        } else {
                            userDao.checkinreg(email, function (err, data) {
                                if (err) {
                                    console.log(err, 'err');
                                    responseHandler.error(res, err);
                                } else
                                    responseHandler.response(res, {
                                        message: "Checkin successful"
                                    })
                            })
                        }
                    }
                })
            } else {
                console.log(1, '1');
                // console.log(err);
                responseHandler.error(res, {
                    message: "No email mentioned"
                });
            }
        } catch (e) {
            console.log(e, 'e');
            responseHandler.error(res, e)
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

    module.exports.getRegisteredEvents = function (req, res) {
        try {
            var auth = req.headers['auth'];
            if(auth){
                userDao.fetchUserFromAuth(auth, function(err, data){
                    console.log(data);
                    if(err)
                        responseHandler.error(res, err);
                    else {
                        userDao.getEventRegisteredByUser(data[0].eid, function(err, data) {
                            console.log(data);
                            if(err)
                                responseHandler.error(res, err);
                            else
                                responseHandler.response(res, data);
                        });
                    }
                });
            } else {
                responseHandler.error(res, { 
                    message : "Please log in"
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    }

})();