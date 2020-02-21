const baseUrl = 'https://www.thecollegefever.com';
const request = require('request').defaults({ baseUrl });

var userService = require('../services/userService');
var responseHandler = require('./responseHandler');


let getAuth = () => {
    return new Promise((resolve, reject) => {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
        var theUrl = "https://www.thecollegefever.com/v1/auth/basiclogin";
        xmlhttp.open("POST", theUrl, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onreadystatechange = function() { // Call a function when the state changes.
            //console.log(this.responseText, this.readyState, XMLHttpRequest.DONE);
            if (this.readyState === 4 && this.status === 200) {
                JSON.parse(this.responseText).sessionId ? resolve(JSON.parse(this.responseText).sessionId) : reject("No session is recovered");
            } else if (this.status === 500) {
                reject(this.responseText);
            }
        }

        xmlhttp.send(JSON.stringify({
            email: "venkateshprasad7777@gmail.com",
            password: "Iio120keTR"
        }));
    })
}

let getPaymentUrl = (auth, user) => {
    return new Promise((resolve, reject) => {
        console.log(auth);

        const request = require('request');

        console.log(user.hash,'Hash');

        console.log(user.eventName,'Event name');

        request.post('https://www.thecollegefever.com/v1/booking/bookticket', {
                json: {
                    eventId: 6832,
                    totalFare : 5250,
                    addExtra: 0,
                    attendingEvents: [{
                        programId: user.hash,
                        programName: 'Enantra 2020',
                        subProgramName: user.eventName,
                        fare: 150,
                        attendees: [{
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            college: user.college,
                            sex: user.sex,
                            extraInfoValue : user.city
                        }]
                    }]
                },
                headers: { Cookie: 'auth='+auth }
            },
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    body.pgUrl ? resolve(body.pgUrl) : reject("No Url found");
                } else if (!error) {
                    //console.log(error);
                    reject(body);
                } else {
                    //console.log(error);
                    reject(error);
                }
            })
    })
}

module.exports.doPayment = async function(req, res, user, callback) {
    
        try{
            const auth = await getAuth();
            const url = await getPaymentUrl(auth, user);
            callback(url);
        }catch(err){
            console.log(err, "error");
            responseHandler.error(res, err);
        }
}