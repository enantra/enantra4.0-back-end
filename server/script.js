(function () {

    var nodemailer = require('nodemailer');
    var connection = require('./configs/connection');
    var _ = require('underscore');
    var details = require('./ebm.json');
    var list = [];
    var commonService = require('./services/commonService');
    var fs = require('fs');
    // var each = require('sync-each');
    var mailservice = require('./services/mailService');
    var oauthConf = require('./configs/oauth.json');
    var async = require('async')
    var path = require('path');

    var attachPath = __dirname + '/attach/certificate.jpg';


    /*var query = "SELECT eid from users where email not in('admin@enantra.org','lenijl18@gmail.com','shankar.rahul739@gmail.com','1999aravindhanraj@gmail.com','nareshkumar666888@gmail.com','harunrashidvnr8@gmail.com','bmmk1210@gmail.com','yashwanthkumar.m.41@gmail.com','asad0813@outlook.com');";

    connection.query(query,function(err,data) {
        console.log(err);
        console.log(data);
        var list = [];
        _.forEach(data,function(item,index) {
            var ar = [];
            commonService.generateToken(4,"EBM-",function(err,token) {
                ar.push(item.eid);
                ar.push(token);
                ar.push(new Date());
                list.push(ar);
            });
        });
        console.log(list.length+":",list);
        var query = "INSERT into ebm(eid,refcode,updated_at) values ?";
        connection.query(query,[list],function(err,data) {
            console.log(err);
            console.log(data);
        })
    });*/


    let data = [
        {
          "email":"www.pavithrasivakumar36@gmail.com"
        },
        {
          "email":"ijebastinpradeep@gmail.com"
        },
        {
          "email":"sharonjulianajames@gmail.com"
        },
        {
          "email":"saikishorelekkala990@gmail.com"
        },
        {
          "email":"konijetitejasai@gmail.com"
        },
        {
          "email":"madhuvikask@gmail.com"
        },
        {
          "email":"vinodhkumarkota1999@gmail.com"
        },
        {
          "email":"bodavulakrishna2@gmail.com"
        },
        {
          "email":"ibm.145131215@gmail.com"
        },
        {
          "email":"lavansmartwell@gmail.com"
        },
        {
          "email":"kotlasrinivas5121@gmail.com"
        },
        {
          "email":"kothasaikoushik@gmail.com"
        },
        {
          "email":"laddu7899@gmail.com"
        },
        {
          "email":"vimal06101994@gmail.com"
        },
        {
          "email":"angelvictoria24@gmail.com"
        },
        {
          "email":"indiramahesh1999@gmail.com"
        },
        {
          "email":"indrasivakumar51@gmail.com"
        },
        {
          "email":"vigneshwaran.rk10@gmail.com"
        },
        {
          "email":"arun17ece@gmail.com"
        },
        {
          "email":"dhanapriyan.bala2000@gmail.com"
        },
        {
          "email":"dg24dgharini@gmail.com"
        },
        {
          "email":"nehashukoor888@gmail.com"
        },
        {
          "email":"manishjain24499@gmail.com"
        },
        {
          "email":"jeevikajeevi13@gmail.com"
        },
        {
          "email":"deepaneyveli30@gmail.com"
        }]
    var listofemails = data;
    // Will store email sent successfully.
    var success_email = [];
    // Will store email whose sending is failed. 
    var failure_email = [];

    var transporter;

    let smallList;

    /* Loading modules done. */

    function massMailer() {
        var self = this;
        transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            pool: true,
            auth: {
                // user: "tsenantra@gmail.com",
                // pass: "capitalize2018"
                type: "OAuth2",
                user: "enantra.tech@gmail.com",
                //pass : "capitalize18"
                clientId: oauthConf.web.client_id,
                clientSecret: oauthConf.web.client_secret,
                refreshToken: oauthConf.web.refresh_token
            }
        });
        // Fetch all the emails from database and push it in listofemails
        // Will do it later.
        self.invokeOperation();
    };

    /* Invoking email sending operation at once */

    massMailer.prototype.invokeOperation = function () {
        var self = this;
        async.each(listofemails, self.SendEmail);
    }

    /* 
     * This function will be called by multiple instance.
     * Each instance will contain one email ID
     * After successfull email operation, it will be pushed in failed or success array.
     */

    massMailer.prototype.SendEmail = function (data, callback) {
        console.log("Sending email to " + data.email);
        var self = this;
        self.status = false;
        // waterfall will go one after another
        // So first email will be sent
        // Callback will jump us to next function
        // in that we will update DB
        // Once done that instance is done.
        // Once every instance is done final callback will be called.
        async.waterfall([
            function (callback) {
                console.log(data.email);
                var mailOptions = {
                    "from": "Enantra <enantra.tech@gmail.com>",
                    "to": data.email,
                    "attachments": [{
                        "file": "certificate.jpg",
                        "path": attachPath
                    }],
                    "subject": "Enantra - Participation Certificate",
                    "html": `<html><head><style>.email-wrapper,body{background-color:#F5F7F9;margin:0}.body-action,.email-footer,.email-masthead{text-align:center}.email-footer p,body,p{color:#839197}.button,body{-webkit-text-size-adjust:none}:not(br):not(tr):not(html){font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-box-sizing:border-box;box-sizing:border-box}body{width:100%!important;height:100%;line-height:1.4}a{color:#414EF9}.email-wrapper{width:100%;padding:0}.email-content{width:100%;margin:0;padding:0}.email-masthead{padding:25px 0}.email-masthead_logo{max-width:400px;border:0}.body-sub,.email-body{border-top:1px solid #E7EAEC}.email-masthead_name{font-size:16px;font-weight:700;color:#839197;text-decoration:none;text-shadow:0 1px 0 #fff}.email-body{width:100%;margin:0;padding:0;border-bottom:1px solid #E7EAEC;background-color:#FFF}.email-body_inner,.email-footer{width:570px;margin:0 auto;padding:0}h1,h2,h3{color:#292E31;font-weight:700}.body-action{width:100%;margin:30px auto;padding:0}.body-sub{margin-top:25px;padding-top:25px}.content-cell{padding:35px}.align-right{text-align:right}h1,h2,h3,p{margin-top:0;text-align:left}h1{font-size:19px}h2{font-size:16px}h3{font-size:14px}p{font-size:16px;line-height:1.5em}.button,p.center{text-align:center}p.sub{font-size:12px}.button{display:inline-block;width:200px;background-color:#414EF9;border-radius:3px;color:#fff;font-size:15px;line-height:45px;text-decoration:none;mso-hide:all}.button--green{background-color:#28DB67}.button--red{background-color:#FF3665}.button--blue{background-color:#414EF9}@media only screen and (max-width:600px){.email-body_inner,.email-footer{width:100%!important}}@media only screen and (max-width:500px){.button{width:100%!important}}</style></head><body>
                      <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center">
                                <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                                  <!-- Logo -->
                                  <tr>
                                    <td class="email-masthead">
                                      <img src="https://enantra.org/favicon.ico" style='width:40px'><br>
                                      <a class="email-masthead_name">Enantra</a>
                                    </td>
                                  </tr>
                                  <!-- Email Body -->
                                  <tr>
                                    <td class="email-body" width="100%">
                                      <table class="email-body_inner" align="center" width="90%" cellpadding="0" cellspacing="0">
                                        <!-- Body content -->
                                        <tr>
                                          <td class="content-cell">
                                            <h1>Dear Participant,</h1>
                                            <p>Thank you for being part of Enantra 3.0's success story . Your profound interest and involvement in the event is valued.
                                            We present you with an E-Certificate which recognises your participation in the respective event.
                                            </p>
                                            <!-- Action -->
                                      <p>
                                      Team Enantra holds your involvement and unwavering support in high regard and will be back bigger ,better and grand as ever next year</p>                             
                                      <p>Warm regards<br><b>Jebin Joshua Moses</b></p>
                                            <!-- Sub copy -->
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                                        <tr>
                                          <td class="content-cell">
                                            <p class="sub center" style='padding:10px;text-align:center;width:90%;margin:auto'>
                                                 <br>You have received this email because you have registered for Enantra.If not please ignore this email.
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                    </body></html>
                    `
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error)
                        failure_email.push(data.email);
                    } else {
                        self.status = true;
                        success_email.push(data.email);
                    }
                    callback(null, self.status, Email);
                });
            },
            function (statusCode, Email, callback) {
                console.log("Will update DB here for " + Email + "With " + statusCode);
                callback();
            }
        ], function () {
            //When everything is done return back to caller.
            callback();
        });
    }

    new massMailer(); //lets begin


})();