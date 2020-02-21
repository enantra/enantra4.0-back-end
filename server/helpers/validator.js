(function () {

    var _ = require('underscore');
    var validator = require('validator');

    module.exports.validateSignup = function (userData, callback) {
        var phone = userData.phone + "";
        if (userData.name !== undefined && userData.department && userData.password !== undefined && userData.email !== undefined && userData.phone !== undefined && userData.college !== undefined && userData.gender !== undefined) {
            if (userData.name.length > 50) {
                callback({ message: "Username must not exceed 50 characters", statusCode: 400 });
            }
            else if (userData.password.length < 8 || userData.password.length > 15) {
                callback({ message: "Password must contain atleast 8 characters and should not exceed 15 characters", statusCode: 400 });
            }
            else if (userData.email.length > 50) {
                callback({ message: "Email ID cannot exceed 50 characters", statusCode: 400 });
            }
            else if (phone.length !== 10) {
                callback({ message: "Please enter a valid mobile number", statusCode: 400 });
            }
            else if (userData.college.length > 200) {
                callback({ message: "Enter valid college name", statusCode: 400 });
            }
            else if (userData.gender < 1 && userData.gender > 3) {
                callback({ message: "Invalid Gender", statusCode: 400 });
            }
            else if (userData.college.length > 200) {
                callback({ message: "Enter Valid department", statusCode: 400 });
            }
            else {
                callback(null);
            }
        }
        else {
            callback({ message: "Bad Input", statusCode: 400 });
        }
    };

    module.exports.validateLogin = function (userData, callback) {
        if (userData.email !== undefined && userData.password !== undefined) {
            if (validator.isEmail(userData.email)) {
                if (userData.password.length < 8 || userData.password.length > 15) {
                    callback({ message: "Invalid Password", statusCode: 420 });
                }
                else {
                    callback(null);
                }
            }
            else {
                callback({ message: "Invalid Email", statusCode: 420 });
            }
        }
        else {
            callback({message:"Please enter email and password",statusCode:400});
        }
    };

})();