(function () {

    var actionService = require('../services/actionService');
    var responseHandler = require('../helpers/responseHandler');
    var validator = require('../helpers/validator');
    var transactionHandler = require('../helpers/transactionHandler');
    var config = require('../configs/config.json');
    var hostConfig = config.prod.host;
    var mailService = require('../services/mailService');
    var commonService = require('../services/commonService');
    var userService = require('../services/userService');
    var connection = require('../configs/connection');
    var hospiPass = require('../configs/hospiPass.json');
    var moment = require('moment');
    var actionDao = require('../dao/actionDao');
    var userDao = require('../dao/userDao');

    module.exports.registerUser = function (req, res) {
        try {
            if (req.body) {
                // console.log(req.body,'req.body');
                if (req.body.user) {
                    var user = req.body.user;
                    // console.log(user,'user');
                    validator.validateSignup(user, function (err) {
                        if (err) {
                            responseHandler.error(res, {
                                message: err.message || 'Error in validating user details'
                            });
                        } else {
                            transactionHandler.beginTransaction(function (err) {
                                if (err) {
                                    responseHandler.error(res, {
                                        message: 'Unexpected error'
                                    });
                                } else {
                                    commonService.generatePasswordHash(user.password, function (err, hash) {
                                        if (err) {
                                            transactionHandler.rollback(res, {
                                                message: 'Unexpected error'
                                            });
                                        } else {
                                            user.password = hash;
                                            commonService.generateToken(10, "E20-", function (err, eid) {
                                                if (err) {
                                                    transactionHandler.rollback(res, {
                                                        message: 'Unexpected error'
                                                    });
                                                } else {
                                                    user.eid = eid;
                                                    commonService.generateToken(40, "", function (err, token) {
                                                        if (err) {
                                                            transactionHandler.rollback(res, {
                                                                message: 'Unexpected error'
                                                            });
                                                        } else {
                                                            user.updatedat = new Date();
                                                            actionService.registerUser(user, function (err, data) {
                                                                if (err) {
                                                                    console.log('Error', err)
                                                                    if (err.code == 'ER_DUP_ENTRY') {
                                                                        actionService.checkUserState(user.email, function (err, data) {
                                                                            if (err) {
                                                                                transactionHandler.rollback(res, {});
                                                                            } else if (data.length) {
                                                                                var data = data[0];
                                                                                if (data.block) {
                                                                                    transactionHandler.rollback(res, { message: 'User already exists.Please verify your account to continue.' })
                                                                                } else {
                                                                                    transactionHandler.rollback(res, { message: 'User already exists.Please login to continue' });
                                                                                }
                                                                            } else {
                                                                                transactionHandler.rollback(res, { message: 'This mobile number is associated with another account' });
                                                                            }
                                                                        })
                                                                    } else {

                                                                        transactionHandler.rollback(res, { message: 'Unexpected error' });
                                                                    }
                                                                } else {
                                                                    actionService.addVerificationEntry(user.eid, token, function (err, data) {
                                                                        if (err) {
                                                                            transactionHandler.rollback(res, err);
                                                                        } else {
                                                                            var link = "https://enantra.org/api/verify?eid=" + eid + "&&token=" + token;
                                                                            
                                                                            mailService.sendVerificationLink(link, user.email, function (err, data) {
                                                                                if (err) {
                                                                                    transactionHandler.rollback(res, { message: 'Please enter a valid email address.' });
                                                                                } else {
                                                                                    connection.commit(function (commitErr) {
                                                                                        if (commitErr) {
                                                                                            connection.rollback(function (rollErr) {
                                                                                                if (rollErr) {
                                                                                                    responseHandler.error(res, rollErr);
                                                                                                } else {
                                                                                                    responseHandler.error(res, commitErr);
                                                                                                }
                                                                                            });
                                                                                        } else {
                                                                                            responseHandler.response(res, {
                                                                                                message: "Success",
                                                                                                user : user
                                                                                            });
                                                                                            //res.redirect('http://localhost:3030/sentmail');
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    responseHandler.error(res, {
                        message: "Bad Input",
                        statusCode: 400
                    });
                }
            } else {
                responseHandler.error(res, {
                    message: "Empty body",
                    statusCode: 400
                });
            }
        } catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.verifyEmail = function (req, res) {
        try {
            if (req.query.eid !== undefined && req.query.token !== undefined) {
                var eid = req.query.eid;
                var token = req.query.token;
                actionService.getVerificationToken(eid, function (err, data) {
                    if (err) {
                        responseHandler.error(res, err);
                    } else {
                        if (data.length > 0) {
                            var dbToken = data[0].token;
                            var expiry = data[0].expiry;
                            var instant = moment() * 1;
                            if (token === dbToken && expiry > instant) {
                                actionService.getUserById(eid, function (err, data) {
                                    if (err) {
                                        responseHandler.error(res, err);
                                    } else {
                                        if (data.length > 0) {
                                            transactionHandler.beginTransaction(function (err) {
                                                if (err) {
                                                    responseHandler.error(res, err);
                                                } else {
                                                    actionService.unblockUser(eid, function (err, data) {
                                                        if (err) {
                                                            transactionHandler.rollback(res, err);
                                                        } else {
                                                            actionService.deleteToken(eid, function (err, data) {
                                                                if (err) {
                                                                    transactionHandler.rollback(res, err);
                                                                } else {
                                                                    actionService.getUserById(eid, function (err, data) {
                                                                        if (err) {
                                                                            transactionHandler.rollback(res, err);
                                                                        } else {
                                                                            var user;
                                                                            commonService.generateQR(user = data[0], function (err, qrcode) {
                                                                                if (err) {
                                                                                    transactionHandler.rollback(res, err);
                                                                                } else {
                                                                                    var qr = qrcode;
                                                                                    // console.log(qr);
                                                                                    commonService.writeQR(eid, qrcode, function (err, path) {
                                                                                        if (err) {
                                                                                            transactionHandler.rollback(res, err);
                                                                                        } else {
                                                                                            mailService.sendQR(user, path, function (err, data) {
                                                                                                if (err) {
                                                                                                    transactionHandler.rollback(res, err);
                                                                                                } else {
                                                                                                    connection.commit(function (commitErr) {
                                                                                                        if (commitErr) {
                                                                                                            connection.rollback(function (rollErr) {
                                                                                                                if (rollErr) {
                                                                                                                    responseHandler.error(res, rollErr);
                                                                                                                } else {
                                                                                                                    responseHandler.error(res, commitErr);
                                                                                                                }
                                                                                                            });
                                                                                                        } else {
                                                                                                            res.redirect('/');
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        } else {
                                            responseHandler.error(res, {
                                                message: "User Not Registered",
                                                statusCode: 420
                                            });
                                        }
                                    }
                                });
                            } else {
                                responseHandler.error(res, {
                                    message: "Invalid or expired Link",
                                    statusCode: 400
                                });
                            }
                        } else {
                            //responseHandler.error(res,{message:"User not registered",statusCode:420});
                            res.redirect('/expiredlink');
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

    module.exports.resetPassword = function (req, res) {
        try {
            if (req.body) {
                if (req.body.user) {

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
    };

    module.exports.login = function (req, res) {
        try {
            if (req.body) {
                console.log(req.body, 'req.body');
                if (req.body.user) {
                    var user = req.body.user;
                    validator.validateLogin(user, function (err, data) {
                        if (err) {
                            responseHandler.error(res, err);
                        } else {
                            //user.ip = req.connection.remoteAddress;
                            actionService.fetchUser(user.email, function (err, data) {
                                if (err) {
                                    responseHandler.error(rers, err);
                                } else {
                                    if (data.length > 0) {
                                        var dbUser = data[0];
                                        // console.log(dbUser);
                                        if (dbUser.block === 1) {
                                            responseHandler.error(res, {
                                                message: "If you haven't verified your mail id, please click the link sent to your address. Otherwise, kindly wait for sometime.",
                                                statusCode: 421
                                            });
                                        } else {
                                            commonService.verifyHash(user.password, dbUser.password, function (err, flag) {
                                                if (err) {
                                                    responseHandler.error(res, err);
                                                } else {
                                                    if (flag) {
                                                        // console.log('yes');
                                                        var session = {};
                                                        commonService.generateToken(10, "", function (err, sessionid) {
                                                            if (err) {
                                                                responseHandler.error(res, err);
                                                            } else {
                                                                session.sessionid = sessionid;
                                                                commonService.generateToken(40, "", function (err, token) {
                                                                    if (err) {
                                                                        responseHandler.error(res, err);
                                                                    } else {
                                                                        session.token = token;
                                                                        session.eid = dbUser.eid;
                                                                        commonService.encodeJWT(session, function (err, JWT) {
                                                                            if (err) {
                                                                                responseHandler.error(res, err);
                                                                            } else {
                                                                                actionService.createSession(session, function (err, data) {
                                                                                    if (err) {
                                                                                        responseHandler.error(res, err);
                                                                                    } else {
                                                                                        responseHandler.response(res, JWT);
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else {
                                                        responseHandler.error(res, {
                                                            message: "Incorect Password",
                                                            statusCode: 420
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    } else {
                                        responseHandler.error(res, {
                                            message: "User not registered.Click <a href='/signup'>here</a> to register",
                                            statusCode: 420
                                        });
                                    }
                                }
                            });
                        }
                    });
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
    };

    module.exports.hospiLogins = function (req, res) {
        try {
            if (req.body) {
                var hospi = req.body.user;
                if (hospi) {
                    console.log('user:', hospi);
                    console.log(hospiPass[hospi.username]);
                    if (hospi.pass === hospiPass[hospi.username]) {
                        responseHandler.response(res, config.private_key);
                    }
                    else {
                        responseHandler.error(res, { message: "Invalid Passwowrd", statusCode: 420 });
                    }
                }
                else {
                    responseHandler.error(res, { message: "Invalid Body", statusCode: 400 });
                }
            }
            else {
                responseHandler.error(res, { message: "Invalid Body", statusCode: 400 });
            }
        }
        catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.QRscan = function (req, res) {
        try {
            if (req.body) {
                var eid = req.body.eid;
                if (eid) {
                    userService.getEventsRegisteredByUser(eid, function (err, data) {
                        if (err) {
                            console.log(err);
                            responseHandler.error(res, err);
                        }
                        else {
                            if (data.length > 0) {
                                commonService.convertToString(data, function (data) {
                                    actionDao.getUserById(eid, function (err, udata) {
                                        if (err) {
                                            responseHandler.error(res, err);
                                        }
                                        else {
                                            responseHandler.qrresponse(res, data, udata[0]);
                                        }
                                    });
                                });
                            }
                            else {
                                responseHandler.qrresponse(res, ["None"], { name: "NA", college: "NA" });
                            }
                        }
                    })
                }
                else {
                    responseHandler.error(res, { message: "Inavlid Body", statusCode: 400 });
                }
            }
            else {
                responseHandler.error(res, { message: "Invalid Body", statusCode: 400 });
            }
        }
        catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.onSpotRegistration = function (req, res) {
        try {

        }
        catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.checkMail = function (req, res) {
        try {
            var email = req.query.email;
            console.log(email);
            if (email) {
                actionDao.checkMail(email, function (err, data) {
                    if (err) {
                        responseHandler.error(res, err);
                    }
                    else {
                        var event = [{
                            id: 2,
                            cname: "General Registartion"
                        }, {
                            id: 5,
                            cname: "Entretainment"
                        },
                        //  {
                        //     id: 6,
                        //     cname: "Entreprenuership-101"
                        // },
                        //  {
                        //     id: 7,
                        //     cname: "Stock Investing"
                        // },
                        //  {
                        //     id: 8,
                        //     cname: "Webprenuership"
                        // },
                        // {
                        //     id: 9,
                        //     cname: "Six Sigma"
                        // },
                        // {
                        //     id: 10,
                        //     cname: "Unconference"
                        // },
                        // {
                        //     id: 11,
                        //     cname: "6DT Day-1"
                        // },
                        {
                            id: 12,
                            cname: "6DT Day-2"
                        }, 
                        // {
                        //     id: 13,
                        //     cname: "Accomodation Day-1 Boys"
                        // }, {
                        //     id: 14,
                        //     cname: "Accomodation Day-1 Girls"
                        // },
                        //  {
                        //     id: 15,
                        //     cname: "Accomodation Day-2 Boys"
                        // }, {
                        //     id: 16,
                        //     cname: "Accomodation Day-2 Girls"
                        // }
                    ];
                        if (data.length > 0) {
                            var user = data[0];
                            userService.getEventRegisteredByUser(user.eid, function (err, data) {
                                if (err) {
                                    responseHandler.error(res, err);
                                }
                                else {
                                    //console.log(data);
                                    if (data.length > 0) {
                                        data.map(function (item, index) {
                                            console.log(index + ':', item);
                                            event = event.filter((e) => e.id != item.id);
                                        });
                                        console.log(event);
                                        responseHandler.response(res, { usflag: 1, eid: user.eid, name: user.name, email, phone: user.phone, events: event });
                                    }
                                    else {
                                        responseHandler.response(res, { usflag: 1, eid: user.eid, name: user.name, email, phone: user.phone, events: event });
                                    }
                                }
                            });
                        }
                        else {
                            responseHandler.response(res, { usflag: 0, events: event });
                        }
                    }
                })
            }
            else {
                responseHandler.error(res, { message: "No email" });
            }
        }
        catch (err) {
            responseHandler.error(res, err);
        }
    };


    module.exports.onSpotSignup = function (req, res) {
        try {
            console.log(req.body, 'req.body');
            if (req.body.eid) {
                var eid = req.body.eid;
                var event = req.body.event;
                var refcode = req.body.referral || "admin";
                var user = { eid };
                userService.checkUserAlreadyRegistered(req.body.event, user, function (err, data) {
                    if (err) {
                        responseHandler.error(res, {
                            message: 'Unexpected error'
                        });
                    } else {
                        // console.log(refcode, 'data');
                        if (data.length) {
                            console.log(data[0], 'data.length');
                            if (data[0].status !== 2) {
                                userService.checkValidReferal(refcode, function (err, data) {
                                    if (err) {
                                        responseHandler.error(res, {
                                            message: 'Invalid Referal Code'
                                        });
                                    } else {
                                        if (data.length) {
                                            // console.log(data[0], 'data[0]');
                                            userService.updateRefCode(refcode, event, user, function (err, data) {
                                                if (err) {
                                                    responseHandler.error(res, {
                                                        message: 'Referal code is invalid'
                                                    });
                                                } else {
                                                    userService.updateStatus(eid, event, function (err, data) {
                                                        if (err) {
                                                            responseHandler.error(res, err);
                                                        }
                                                        else {
                                                            userDao.updateCheckin(eid, event, function (err, data) {
                                                                if (err) {
                                                                    responseHandler.error(res, err);
                                                                }
                                                                else {
                                                                    responseHandler.response(res, { message: "Success" });
                                                                }
                                                            });
                                                        }
                                                    })
                                                }
                                            });
                                        } else {
                                            responseHandler.error(res, {
                                                message: 'Invalid Referal Code'
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
                            //var link = `https://www.townscript.com/e/${event.eventname}/booking?${event.ticketname}=1&name=${user.name}&emailid=${user.email}`;
                            var reg = {};
                            reg.event = req.body.event;
                            reg.eid = eid;
                            reg.status = 2;
                            reg.referral = refcode || "admin";
                            // console.log(reg, 'reg');
                            userService.checkValidReferal(reg.referral, function (err, data) {
                                if (err) {
                                    console.log(err, 'err');
                                    responseHandler.error(res, {
                                        message: 'Invalid Referal Code'
                                    });
                                } else {
                                    // console.log(data, 'data');
                                    if (data.length) {
                                        userService.registerUserForEvent(reg, function (err, data) {
                                            if (err) {
                                                responseHandler.error(res, {
                                                    message: 'Unexpected error'
                                                });
                                            } else {
                                                //res.redirect(link);
                                                userDao.updateCheckin(eid, req.body.event, function (err, data) {
                                                    if (err) {
                                                        responseHandler.error(res, err);
                                                    }
                                                    else {
                                                        responseHandler.response(res, { message: "Success" });
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        responseHandler.error(res, {
                                            message: 'Invalid Referal Code'
                                        })
                                    }
                                }
                            })
                            //console.log(reg);

                        }
                    }
                });
            }
            else {
                var user = req.body.user;
                var event = req.body.event;
                if (user) {
                    //var user = req.body.user;
                    // console.log(user,'user');
                    transactionHandler.beginTransaction(function (err) {
                        if (err) {
                            responseHandler.error(res, {
                                message: 'Unexpected error'
                            });
                        } else {
                            commonService.generatePasswordHash("enantra3.0", function (err, hash) {
                                if (err) {
                                    transactionHandler.rollback(res, {
                                        message: 'Unexpected error'
                                    });
                                } else {
                                    user.password = hash;
                                    commonService.generateToken(10, "E20-", function (err, eid) {
                                        if (err) {
                                            transactionHandler.rollback(res, {
                                                message: 'Unexpected error'
                                            });
                                        } else {
                                            user.eid = eid;
                                            user.updatedat = new Date();
                                            actionService.registerUser(user, function (err, data) {
                                                if (err) {
                                                    console.log('Error', err)
                                                    if (err.code == 'ER_DUP_ENTRY') {
                                                        actionService.checkUserState(user.email, function (err, data) {
                                                            if (err) {
                                                                transactionHandler.rollback(res, {});
                                                            } else if (data.length) {
                                                                var data = data[0];
                                                                if (data.block) {
                                                                    transactionHandler.rollback(res, { message: 'User already exists.Please verify your account to continue.' })
                                                                } else {
                                                                    transactionHandler.rollback(res, { message: 'User already exists.Please login to continue' });
                                                                }
                                                            } else {
                                                                transactionHandler.rollback(res, { message: 'This mobile number is associated with another account' });
                                                            }
                                                        })
                                                    } else {
                                                        transactionHandler.rollback(res, { message: 'Unexpected error' });
                                                    }
                                                } else {
                                                    var refcode = req.body.referral || "admin";
                                                    userService.checkUserAlreadyRegistered(req.body.event, user, function (err, data) {
                                                        if (err) {
                                                            transactionHandler.rollback(res, {
                                                                message: 'Unexpected error'
                                                            });
                                                        } else {
                                                            // console.log(refcode, 'data');
                                                            if (data.length) {
                                                                console.log(data[0], 'data.length');
                                                                if (data[0].status !== 2) {
                                                                    userService.checkValidReferal(refcode, function (err, data) {
                                                                        if (err) {
                                                                            transactionHandler.rollback(res, {
                                                                                message: 'Invalid Referal Code'
                                                                            });
                                                                        } else {
                                                                            if (data.length) {
                                                                                // console.log(data[0], 'data[0]');
                                                                                userService.updateRefCode(refcode, event, user, function (err, data) {
                                                                                    if (err) {
                                                                                        transactionHandler.rollback(res, {
                                                                                            message: 'Referal code is invalid'
                                                                                        });
                                                                                    } else {
                                                                                        userService.updateStatus(eid, event, function (err, data) {
                                                                                            if (err) {
                                                                                                transactionHandler.rollback(res, err);
                                                                                            }
                                                                                            else {
                                                                                                userDao.updateCheckin(eid, event, function (err, data) {
                                                                                                    if (err) {
                                                                                                        transactionHandler.rollback(res, err);
                                                                                                    }
                                                                                                    else {
                                                                                                        transactionHandler.commit(res, { message: "Success" });
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                transactionHandler.rollback(res, {
                                                                                    message: 'Invalid Referal Code'
                                                                                })
                                                                            }
                                                                        }
                                                                    })
                                                                } else {
                                                                    transactionHandler.rollback(res, {
                                                                        message: "User Already Registered for this event",
                                                                        statusCode: 420
                                                                    });
                                                                }
                                                            } else {
                                                                //var link = `https://www.townscript.com/e/${event.eventname}/booking?${event.ticketname}=1&name=${user.name}&emailid=${user.email}`;
                                                                var reg = {};
                                                                reg.event = req.body.event;
                                                                reg.eid = eid;
                                                                reg.status = 2;
                                                                reg.referral = refcode || "admin";
                                                                // console.log(reg, 'reg');
                                                                userService.checkValidReferal(reg.referral, function (err, data) {
                                                                    if (err) {
                                                                        console.log(err, 'err');
                                                                        transactionHandler.rollback(res, {
                                                                            message: 'Invalid Referal Code'
                                                                        });
                                                                    } else {
                                                                        // console.log(data, 'data');
                                                                        if (data.length) {
                                                                            userService.registerUserForEvent(reg, function (err, data) {
                                                                                if (err) {
                                                                                    transactionHandler.rollback(res, {
                                                                                        message: 'Unexpected error'
                                                                                    });
                                                                                } else {
                                                                                    //res.redirect(link);
                                                                                    userDao.updateCheckin(eid, event, function (err, data) {
                                                                                        if (err) {
                                                                                            transactionHandler.rollback(res, err);
                                                                                        }
                                                                                        else {
                                                                                            transactionHandler.commit(res, { message: "Success" });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        } else {
                                                                            transactionHandler.rollback(res, {
                                                                                message: 'Invalid Referal Code'
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
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    responseHandler.error(res, {
                        message: "Bad Input",
                        statusCode: 400
                    });
                }
            }
        }
        catch (err) {
            responseHandler.error(res, err);
        }
    }


})();
