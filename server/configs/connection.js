(function() {

    var mysql = require('mysql');
    var conf = require('./config.json');
    var dbConfig = conf.prod.mysql;

    var connection = mysql.createConnection(dbConfig);

    connection.connect(function(err) {
        if(err) {
            console.error('DB connection error:'+err.message);
        }
        else {
            console.log('DB connection established');
        }
    });

    module.exports = connection;

})();