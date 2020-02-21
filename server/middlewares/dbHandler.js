(function () {

    var responseHandler = require('../helpers/responseHandler');

    module.exports = function (connection) {
        var dbHandler = function (req, res, next) {
            try{
                if(connection.state === "authenticated"){
                    console.log('Working');
                    return next();
                }
                else{
                    connection.connect(function (err) {
                        if(err){
                            process.exit(0);
                        }
                        else{
                            return next();
                        }
                    });
                }
            }
            catch (err){
                process.exit(0);
            }

        };
        dbHandler.failed = function () {
            dbHandler.failed=function(res,mes){
                var err = new Error(mes);
                err.statusCode = 401;
                responseHandler.error(res,err);
            };
        };
        return dbHandler;
    };

})();