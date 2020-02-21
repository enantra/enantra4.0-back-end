(function () {

    var nodemailer = require('nodemailer');
    var connection = require('./configs/connection');
    var _ = require('underscore');
    var mailer = require('./configs/transport2');
    var path = require('path');
    var img1 = path.resolve("/attach/1.jpg");
    var img2 = path.resolve("/attach/Mini Events Poster 2.jpg");
    var img3 = path.resolve("/attach/six sigma.jpg");
    var img4 = path.resolve("/attach/Startup Street.jpg");
    var pdf = path.resolve("/attach/ENANTRA 3 Events Brochure.pdf");
    var async = require('async');
    var query = "select email from users";
    connection.query(query, function (err, data) {
        // console.log(data);
        var emails = [];
        _.forEach(data, function (item, index) {
            emails.push(item.email);
        });
        // console.log(emails);

        //data = [{email:"prabhu231197@gmail.com"},{email:"lenijl18@gmail.com"}];

        var mail = `<html>
        <head>
        <style type="text/css">
        .bold-text {
        font-style: bold;
        }
        p{
            color:black!important;
        }
        </style>
        </head>
        <body>
        <img style="height:100px;width:100%" src='https://enantra.org/enantra.png'>
        <div style="padding:2%">
        <span>Greetings from Team Capitalize!</span>
        <p>Capitalize, the student run entrepreneurship club of Anna University takes immense pleasure in hosting the annual management fest of this prestigious alma mater, <span style="font-weight:bold">ENANTRA- the Entrepreneurship Mantra.</span></p>
        <p>Widely popular as south India’s largest entrepreneurship festival, Enantra stands true to its vision of inculcating entrepreneurial ideals and ethics among the youth. Also empowering and envisioning the art of corporate play, the Enantra 2.0 has had an immense reach in Tamil Nadu, inviting <span style="font-weight:bold">startups, mentors and investors from all over India and the world,</span> welcoming a footfall of close to 3500, in one variant platform.</p>
        <p>
        This year again, the team is set to unveil yet another remarkable edition, We are delighted to invite you as the Enantra Brand Manager for <span style="font-weight:bold">ENANTRA 3.0- 2019</span> to be held on the days of 7th to 10th February, 2019,set to showcase the zest for entrepreneurship.A generous gesture of support in terms of investment and interest, from the <span style="font-weight:bold">Centre for entrepreneurship development (CED)</span> and the <span style="font-weight:bold">Entrepreneurship Development and Innovation Institute (EDII)</span> has indeed been one of the most eminent factors for <span style="font-weight:bold">Enantra- The entrepreneurship mantra,</span> to materialize and reap success over the years. This year again <span style="font-weight:bold">Enantra 3.0</span> is all set to  stand true to its acclaim.
        </p>
        <p>Looking forward to your presence and the active participation from the students of your college!</p>
        <p>Please do acknowledge if received.</p>
        <br/>
        <p>Regards,</p>
        <p>Team Capitalize</p>
        <span style="font-weight:bold;">Contact Details -</span>
        <br/>
        <br/>
        <span style="font-weight:bold;">Mohammed Sulaiman - </span><span>+91 7806976789</span>
        <br/>
        <br/>
        <span style="font-weight:bold;">Aadil Sheriff - </span><span>+91 9566661249</span>
        <br/><br/>
        <span style="font-weight:bold;">Abhishek Pandey - </span><span>+91 7871089522</span>
        <br/><br/>
        <span>Mail us at:</span><span style="margin-left:5px"><a>marketing@enantra.org</a></span>
        <br/><br/>
        <span>Register at: </span><a href="https://enantra.org">https://enantra.org</a>
        </div>
        </body>
        </html>`;

        var listofemails = data.slice(1,100);
        // var listofemails = [{'email':'enantra.tech@gmail.com'}]
        // Will store email sent successfully.
        var success_email = [];
        // Will store email whose sending is failed. 
        var failure_email = [];

        var transporter;

        /* Loading modules done. */

        function massMailer() {
            var self = this;
            transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                pool: true,
                auth: {
                    type: "OAuth2",
                    user: "tsenantra@gmail.com",
                    // pass : "capitalize2018"
                    clientId: '230176944291-cfpsb3g3aoq3nmio9df38oea9pitrkrf.apps.googleusercontent.com',
                    clientSecret: 'zqkmkrFW_-yKfxutudrcz8vh',
                    refreshToken: '1/32UzNP56XWaO6LihXl-WnJpB1YArJEwEroFUmXZX4Ko49VhBaBOqPNXDHGfk4JQW'
                }
            });
            // Fetch all the emails from database and push it in listofemails
            // Will do it later.
            self.invokeOperation();
        };

        /* Invoking email sending operation at once */

        massMailer.prototype.invokeOperation = function () {
            var self = this;
            async.each(listofemails, self.SendEmail, function () {
                console.log(success_email);
                console.log(failure_email);
            });
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
                    console.log(data.email)
                    var mailOptions = {
                        from: "Enantra <tsenantra@gmail.com>",
                        to: data.email,
                        subject: "Enantra 3.0 Invitation",
                        html: mail,
                        // attachments: [{
                        //     filename: '1.jpg',
                        //     path: img1
                        // },
                        // {
                        //     filename: '2.jpg',
                        //     path: img2
                        // }, {
                        //     filename: '3.jpg',
                        //     path: img3
                        // }, {
                        //     filename: '4.jpg',
                        //     path: img4
                        // }, {
                        //     filename: '5.pdf',
                        //     path: pdf
                        // }]
                    };
                    console.log('here')
                    transporter.sendMail(mailOptions, function (error, info) {
                        console.log('inf')
                        if (error) {
                            console.log(error)
                            failure_email.push(data.email);
                        } else {
                            self.status = true;
                            success_email.push(data.email);
                        }
                        callback(null, self.status, null);
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



        // mailer.verify(function(error, success) {
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log("Server is ready to take our messages");
        //     }
        //   });
        // console.log('here')
        // mailer.sendMail(options,function(err,data) {
        //     console.log(err);
        //     console.log(data);
        // })

    });

})();