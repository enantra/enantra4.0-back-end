(function() {

    var nodemailer = require('nodemailer');
    var connection = require('./configs/connection');
    var _ = require('underscore');
    var mailer = require('./configs/transport2');
    var path = require('path');
    var img1 = path.resolve("attach/1.jpg");
    var img2 = path.resolve("attach/Mini Events Poster 2.jpg");
    var img3 = path.resolve("attach/six sigma.jpg");
    var img4 = path.resolve("attach/Startup Street.jpg");
    var pdf = path.resolve("attach/ENANTRA 3 Events Brochure.pdf");

    var query = "select email from users";
    connection.query(query,function(err,data) {
        // console.log(data);
        var emails = [];
        _.forEach(data,function(item,index) {
            emails.push(item.email);
        });
        console.log(emails);
        var mail = `<html>
        <head>
        <style type="text/css">
        .bold-text {
        font-style: bold;
        }
        </style>
        </head>
        <body>
        <img style="height:100px;width:100%" src='enantra.png'>
        <div style="padding:2%">
        <span>Greetings from Team Capitalize!</span>
        <p>Enantra is back again this year bigger, better and grander than ever. We appreciate the interest and involvement shown by you last year and believe that with the huge array of events lined up, you could once again prove your mettle and pave your path to success. This year we bring to you some very unique events for you to think about such as in workshops, we have the all new “Webpreneurship” which combines the best in entrepreneurship and e-commerce and “Six Sigma” which is the need of the hour in the industry. For the past 2 editions, our flagship event-talk show 6DT has seen great entrepreneurs and leaders step on our turf and inspire one and all,this year is no different! With the likes of Madan Gowri, Put Chutney and many more,6DT will be an event not to be missed! Join us in celebrating the spirit  of entrepreneurship and in the process redeeming your interest for the same!</p>
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

        var options = {
            from: "Enantra <tsenantra@gmail.com>",
            to: emails,
            subject: "Enantra 3.0 Invitation",
            html: mail,
            attachments: [{
                filename: '1.jpg',
                path: img1
            },
            {
                filename: '2.jpg',
                path: img2
            },{
                filename: '3.jpg',
                path: img3
            },{
                filename: '4.jpg',
                path: img4
            }]
        };

        // mailer.verify(function(error, success) {
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log("Server is ready to take our messages");
        //     }
        //   });
        // console.log('here')
        mailer.sendMail(options,function(err,data) {
            console.log(err);
            console.log(data);
        })
        
    })

})();