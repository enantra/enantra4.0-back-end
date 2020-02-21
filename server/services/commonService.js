(function() {

    var bcrypt = require('bcryptjs');
    var tokenGenerator = require('voucher-code-generator');
    var jwt = require('jsonwebtoken');
    var key = require('../configs/config.json').private_key;
    var QR = require('qrcode');
    var fs = require('fs');
    var path = require('path');
    var Cryptr = require('cryptr');
    var cryptr = new Cryptr('key');
    var _ = require('underscore');
    var QRpath = path.resolve("./server/qrcodes");


    module.exports.generatePasswordHash = function(password,callback) {
        try {
            bcrypt.genSalt(2,function(err,salt) {
                if(err) {
                    callback(err);
                }
                else {
                    bcrypt.hash(password,salt,function(err,hash) {
                        callback(err,hash);
                    });
                }
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.verifyHash = function(password,hash,callback) {
        try {
            bcrypt.compare(password,hash,function(err,flag) {
                callback(err,flag);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.generateToken = function(length,prefix,callback) {
        try {
            var token = tokenGenerator.generate({
                count: 1,
                length: length,
                charset: tokenGenerator.charset('alphanumeric'),
                prefix: prefix
            }).toString().toUpperCase();
            callback(null,token);
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.encodeJWT = function(json,callback) {
        try {
            jwt.sign(json,key,{expiresIn:"4d"},function(err,jwt){
                callback(err,jwt);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.decodeJWT = function(auth,callback) {
        try {
            var obj = jwt.decode(auth);
            console.log(obj);
            callback(null,obj);
        }
        catch(err) {
            console.log(err);
            callback(err);
        }
    };

    module.exports.generateQR = function(userData,callback) {
        try {
            //userData = JSON.stringify(userData);
            var data = {};
            data.eid = userData.eid;
            //data.email = userData.email;
            userData = JSON.stringify(data);
            //userData = cryptr.encrypt(userData);
            QR.toDataURL(userData,{type:'image/jpeg'},function(err,qrcode) {
                callback(err,qrcode);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.writeQR = function(eid,qrcode,callback) {
        try {
            var path = QRpath+'/'+eid+'.png';
            console.log('path:',path);
            if(fs.existsSync(path)) {
                callback(null);
            }
            else {
                var base64d = qrcode.replace(/^data:image\/png;base64,/, "");
                fs.writeFile(path,base64d,'base64',function(err) {
                    callback(err,path);
                });
            }
        }
        catch(err) {
            callback(err);
        }
    }

    module.exports.convertToString = function(array,callback) {
        var data = [];
        console.log(array);
        _.forEach(array,function(item,index) {
            data.push(item.event);
        });
        callback(data);
    }


})();