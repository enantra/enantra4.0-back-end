(function() {

    module.exports = {
        response : function(res,response) {
            var data = {};
            data.statusCode = 200;
            data.message = "Success";
            data.response = response;
            res.status(200).json(data);
        },
        error : function(res,err) {
            var error = {};
            console.log(err);
            error.statusCode = err.statusCode!==undefined?err.statusCode:500;
            error.message = err.message!==undefined?err.message:"Something went wrong";
            error.code = err.code!==undefined?err.code:"Unknown code";
            error.stack = err.stack!==undefined?err.stack:"unknown stack";
            res.status(error.statusCode).json(error);
        },
        qrresponse : function(res,response,user) {
            var data = {};
            data.statusCode = 200;
            data.message = "Success";
            data.response = response;
            data.user = user;
            res.status(200).json(data);
        }
    };

})();