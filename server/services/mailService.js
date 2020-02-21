(function () {

  var transport = require('../configs/smtpTransport');

  module.exports.sendVerificationLink = function (link, email, callback) {
    var mail = {
      "from": "Enantra <enantra.tech@gmail.com>",
      "to": email,
      "subject": "User Account Verification",
      "html": `<html><head><style>.email-wrapper,body{background-color:#F5F7F9;margin:0}.body-action,.email-footer,.email-masthead{text-align:center}.email-footer p,body,p{color:#839197}.button,body{-webkit-text-size-adjust:none}:not(br):not(tr):not(html){font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-box-sizing:border-box;box-sizing:border-box}body{width:100%!important;height:100%;line-height:1.4}a{color:#414EF9}.email-wrapper{width:100%;padding:0}.email-content{width:100%;margin:0;padding:0}.email-masthead{padding:25px 0}.email-masthead_logo{max-width:400px;border:0}.body-sub,.email-body{border-top:1px solid #E7EAEC}.email-masthead_name{font-size:16px;font-weight:700;color:#839197;text-decoration:none;text-shadow:0 1px 0 #fff}.email-body{width:100%;margin:0;padding:0;border-bottom:1px solid #E7EAEC;background-color:#FFF}.email-body_inner,.email-footer{width:570px;margin:0 auto;padding:0}h1,h2,h3{color:#292E31;font-weight:700}.body-action{width:100%;margin:30px auto;padding:0}.body-sub{margin-top:25px;padding-top:25px}.content-cell{padding:35px}.align-right{text-align:right}h1,h2,h3,p{margin-top:0;text-align:left}h1{font-size:19px}h2{font-size:16px}h3{font-size:14px}p{font-size:16px;line-height:1.5em}.button,p.center{text-align:center}p.sub{font-size:12px}.button{display:inline-block;width:200px;background-color:#414EF9;border-radius:3px;color:#fff;font-size:15px;line-height:45px;text-decoration:none;mso-hide:all}.button--green{background-color:#28DB67}.button--red{background-color:#FF3665}.button--blue{background-color:#414EF9}@media only screen and (max-width:600px){.email-body_inner,.email-footer{width:100%!important}}@media only screen and (max-width:500px){.button{width:100%!important}}</style></head><body>
            <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                    <!-- Logo -->
                    <tr>
                      <td class="email-masthead">
                        <img src="https://enantra.org/favicon.jpg" style='width:40px'><br>
                        <a class="email-masthead_name">Enantra</a>
                      </td>
                    </tr>
                    <!-- Email Body -->
                    <tr>
                      <td class="email-body" width="100%">
                        <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                          <!-- Body content -->
                          <tr>
                            <td class="content-cell">
                              <h1>Verify your email address</h1>
                              <p>Thanks for signing up with Enantra! We're excited to have you as part of our team.</p>
                              <!-- Action -->
                              <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td align="center">
                                    <div>
                                      <a href="${link}" style="color:white!important" class="button button--blue">Verify Email</a>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <p>Thanks,<br>Team Enantra</p>
                              <!-- Sub copy -->
                              <table class="body-sub">
                                <tr>
                                  <td>
                                    <p class="sub">If you’re having trouble clicking the button,copy and paste this link in your browser <br>${link}<br>
                                    </p>
                                    <p class="sub">Email us At enantra.tech@gmail.com</p>
                                  </td>
                                </tr>
                              </table>
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
                                   <br>You have received this email because you have signed up for enantra.If not please ignore this email.
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

    transport.sendMail(mail, function (err, data) {
      console.log(err);
      callback(err, data);
    });
  };

  module.exports.sendQR = function (user, qrcode, callback) {
    // console.log('final:',qrcode);
    var mail = {
      from: "Enantra <enantra.tech@gmail.com>",
      to: user.email,
      subject: "Your Password and Unique QR code for Enantra 2k20",
      html: `<p>Kindly save this QR code as a screenshot and take it to the event...</p>`,
      attachments: [{
        filename: `${user.eid}.png`,
        path: qrcode
      }]
    };

    transport.sendMail(mail, function (err, data) {
      callback(err, data);
    });

  };

  module.exports.sendResetLink = function (email, link, callback) {
    var mail = {
      "from": "Enantra <enantra.tech@gmail.com>",
      "to": email,
      "subject": "Password reset instructions",
      "html": `<html><head><style>.email-wrapper,body{background-color:#F5F7F9;margin:0}.body-action,.email-footer,.email-masthead{text-align:center}.email-footer p,body,p{color:#839197}.button,body{-webkit-text-size-adjust:none}:not(br):not(tr):not(html){font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-box-sizing:border-box;box-sizing:border-box}body{width:100%!important;height:100%;line-height:1.4}a{color:#414EF9}.email-wrapper{width:100%;padding:0}.email-content{width:100%;margin:0;padding:0}.email-masthead{padding:25px 0}.email-masthead_logo{max-width:400px;border:0}.body-sub,.email-body{border-top:1px solid #E7EAEC}.email-masthead_name{font-size:16px;font-weight:700;color:#839197;text-decoration:none;text-shadow:0 1px 0 #fff}.email-body{width:100%;margin:0;padding:0;border-bottom:1px solid #E7EAEC;background-color:#FFF}.email-body_inner,.email-footer{width:570px;margin:0 auto;padding:0}h1,h2,h3{color:#292E31;font-weight:700}.body-action{width:100%;margin:30px auto;padding:0}.body-sub{margin-top:25px;padding-top:25px}.content-cell{padding:35px}.align-right{text-align:right}h1,h2,h3,p{margin-top:0;text-align:left}h1{font-size:19px}h2{font-size:16px}h3{font-size:14px}p{font-size:16px;line-height:1.5em}.button,p.center{text-align:center}p.sub{font-size:12px}.button{display:inline-block;width:200px;background-color:#414EF9;border-radius:3px;color:#fff;font-size:15px;line-height:45px;text-decoration:none;mso-hide:all}.button--green{background-color:#28DB67}.button--red{background-color:#FF3665}.button--blue{background-color:#414EF9}@media only screen and (max-width:600px){.email-body_inner,.email-footer{width:100%!important}}@media only screen and (max-width:500px){.button{width:100%!important}}</style></head><body>
      <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
              <!-- Logo -->
              <tr>
                <td class="email-masthead">
                  <img src="https://enantra.org/favicon.jpg" style='width:40px'><br>
                  <a class="email-masthead_name">Enantra</a>
                </td>
              </tr>
              <!-- Email Body -->
              <tr>
                <td class="email-body" width="100%">
                  <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                    <!-- Body content -->
                    <tr>
                      <td class="content-cell">
                        <h1>Reset your password</h1>
                        <p>Follow the link below to reset your passwo</p>
                        <!-- Action -->
                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <div>
                                <a href="${link}" style="color:white!important" class="button button--blue">Reset Password</a>
                              </div>
                            </td>
                          </tr>
                        </table>
                        <p>Thanks,<br>Team Enantra</p>
                        <!-- Sub copy -->
                        <table class="body-sub">
                          <tr>
                            <td>
                              <p class="sub">If you’re having trouble clicking the button,copy and paste this link in your browser <br>${link}<br>
                              </p>
                              <p class="sub">Email us At enantra.tech@gmail.com</p>
                            </td>
                          </tr>
                        </table>
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
                             <br>You have received this email because you have signed up for enantra.If not please ignore this email.
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

    transport.sendMail(mail, function (err, data) {
      callback(err, data);
    });
  };

  module.exports.ebmCode = function (email, ebmcode) {
    var mail = {
      "from": "Enantra <enantra.tech@gmail.com>",
      "to": email,
      "subject": "EBM Referral codes",
      "html": `<html><head><style>.email-wrapper,body{background-color:#F5F7F9;margin:0}.body-action,.email-footer,.email-masthead{text-align:center}.email-footer p,body,p{color:#839197}.button,body{-webkit-text-size-adjust:none}:not(br):not(tr):not(html){font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-box-sizing:border-box;box-sizing:border-box}body{width:100%!important;height:100%;line-height:1.4}a{color:#414EF9}.email-wrapper{width:100%;padding:0}.email-content{width:100%;margin:0;padding:0}.email-masthead{padding:25px 0}.email-masthead_logo{max-width:400px;border:0}.body-sub,.email-body{border-top:1px solid #E7EAEC}.email-masthead_name{font-size:16px;font-weight:700;color:#839197;text-decoration:none;text-shadow:0 1px 0 #fff}.email-body{width:100%;margin:0;padding:0;border-bottom:1px solid #E7EAEC;background-color:#FFF}.email-body_inner,.email-footer{width:570px;margin:0 auto;padding:0}h1,h2,h3{color:#292E31;font-weight:700}.body-action{width:100%;margin:30px auto;padding:0}.body-sub{margin-top:25px;padding-top:25px}.content-cell{padding:35px}.align-right{text-align:right}h1,h2,h3,p{margin-top:0;text-align:left}h1{font-size:19px}h2{font-size:16px}h3{font-size:14px}p{font-size:16px;line-height:1.5em}.button,p.center{text-align:center}p.sub{font-size:12px}.button{display:inline-block;width:200px;background-color:#414EF9;border-radius:3px;color:#fff;font-size:15px;line-height:45px;text-decoration:none;mso-hide:all}.button--green{background-color:#28DB67}.button--red{background-color:#FF3665}.button--blue{background-color:#414EF9}@media only screen and (max-width:600px){.email-body_inner,.email-footer{width:100%!important}}@media only screen and (max-width:500px){.button{width:100%!important}}</style></head><body>
        <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                    <!-- Logo -->
                    <tr>
                      <td class="email-masthead">
                        <img src="https://enantra.org/favicon.jpg" style='width:40px'><br>
                        <a class="email-masthead_name">Enantra</a>
                      </td>
                    </tr>
                    <!-- Email Body -->
                    <tr>
                      <td class="email-body" width="100%">
                        <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                          <!-- Body content -->
                          <tr>
                            <td class="content-cell">
                              <h1>Greetings from team <b>Enantra</b></h1>
                              <p>We are exicited to have you as EBM for Enantra 2020.We have created an account for you with default password.You can reset your password using the link <a href='https://enantra.org/forget' target='_blank'>https://enantra.org/forget</a> by entering your email to continue.</p>
 <p>Your unique referral code is</p>
                              <!-- Action -->
                              <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td align="center">
                                    <div>
                                      <p style="color:white!important;font-weight:700" class="button button--blue">${ebmcode}</br>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                        <p>Please make sure that your referral code is entered correctly while buying any ticket from us.</p>                             <p>Thanks,<br>Team Enantra</p>
                              <!-- Sub copy -->
                              <table class="body-sub">
                                <tr>
                                  <td>
                                    <p class="sub">If you’re having trouble, contact us.
                                    </p>
                                    <p class="sub">Email us At enantra.tech@gmail.com</p>
                                  </td>
                                </tr>
                              </table>
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
                                   <br>You have received this email because you have signed up for enantra.If not please ignore this email.
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

    transport.sendMail(mail);
  };

  module.exports.sendPaymentConfirmation = function (data, callback) {
    var mail =  {
      "from" : "Enantra <enantra.tech@gmail.com>",
      "to" : data.email,
      "subject" : "Payment Successful",
      "html" : `
      <html><head><style>.email-wrapper,body{background-color:#F5F7F9;margin:0}.body-action,.email-footer,.email-masthead{text-align:center}.email-footer p,body,p{color:#839197}.button,body{-webkit-text-size-adjust:none}:not(br):not(tr):not(html){font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-box-sizing:border-box;box-sizing:border-box}body{width:100%!important;height:100%;line-height:1.4}a{color:#414EF9}.email-wrapper{width:100%;padding:0}.email-content{width:100%;margin:0;padding:0}.email-masthead{padding:25px 0}.email-masthead_logo{max-width:400px;border:0}.body-sub,.email-body{border-top:1px solid #E7EAEC}.email-masthead_name{font-size:16px;font-weight:700;color:#839197;text-decoration:none;text-shadow:0 1px 0 #fff}.email-body{width:100%;margin:0;padding:0;border-bottom:1px solid #E7EAEC;background-color:#FFF}.email-body_inner,.email-footer{width:570px;margin:0 auto;padding:0}h1,h2,h3{color:#292E31;font-weight:700}.body-action{width:100%;margin:30px auto;padding:0}.body-sub{margin-top:25px;padding-top:25px}.content-cell{padding:35px}.align-right{text-align:right}h1,h2,h3,p{margin-top:0;text-align:left}h1{font-size:19px}h2{font-size:16px}h3{font-size:14px}p{font-size:16px;line-height:1.5em}.button,p.center{text-align:center}p.sub{font-size:12px}.button{display:inline-block;width:200px;background-color:#414EF9;border-radius:3px;color:#fff;font-size:15px;line-height:45px;text-decoration:none;mso-hide:all}.button--green{background-color:#28DB67}.button--red{background-color:#FF3665}.button--blue{background-color:#414EF9}@media only screen and (max-width:600px){.email-body_inner,.email-footer{width:100%!important}}@media only screen and (max-width:500px){.button{width:100%!important}}</style></head><body>
            <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
              <tbody><tr>
                <td align="center">
                  <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                    <!-- Logo -->
                    <tbody><tr>
                      <td class="email-masthead">
                        <img src="https://enantra.org/favicon.jpg" style="width:40px"><br>
                        <a class="email-masthead_name">Enantra 2020</a>
                      </td>
                    </tr>
                    <!-- Email Body -->
                    <tr>
                      <td class="email-body" width="100%">
                        <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                          <!-- Body content -->
                          <tbody><tr>
                            <td class="content-cell">
                              <h1>Payment Successful</h1>
                              <p>Thank you ${data.name} for registering in ${data.event}. Hope you enjoy it!</p>
                              <!-- Action -->
                              <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                  <td align="center">
                                    <div>
                                      <h1> Ticket details </h1>
                                      <p> Ticket ID : ${data.ticketId} </p>
                                      <p> Total Fare : ${data.totalFare} </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody></table>
                              <p>Thanks,<br>Team Enantra</p>
                              <!-- Sub copy -->
                              <table class="body-sub">
                                <tbody><tr>
                                  <td>
                                    <p class="sub">If you have any query or if you face any problems
                                    </p>
                                    <p class="sub">Email us At enantra.tech@gmail.com</p>
                                  </td>
                                </tr>
                              </tbody></table>
                            </td>
                          </tr>
                        </tbody></table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                          <tbody><tr>
                            <td class="content-cell">
                              <p class="sub center" style="padding:10px;text-align:center;width:90%;margin:auto">
                                   <br>You have received this email because you have signed up for enantra.If not please ignore this email.
                              </p>
                            </td>
                          </tr>
                        </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
            </tbody></table>
          </body></html>
      
      `
    };
    transport.sendMail(mail, function (err, data) {
      callback(err, data);
    });
  };

})();