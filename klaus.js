(function() {

    //------------------------------------------------------------Dependencies-------------------------------------------------------------------//

    var express = require('express');
    var app = express();
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var logger = require('morgan');
    var path = require('path');
    var connection = require('./server/configs/connection');
    var dbHandler = require('./server/middlewares/dbHandler');
    var authHandler = require('./server/middlewares/authHandler');
    var adminWare = require('./server/middlewares/adminWare');


    //-------------------------------------------------------------Middlewares-------------------------------------------------------------------//

    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
    app.use(logger('dev'));
    app.use(dbHandler(connection));
    app.use('/api/user/*',authHandler());
    app.use('/api/user/!*',authHandler());
    app.use('/api/hospi/*',adminWare());
    app.use('/api/hospi/!*',adminWare());

    
    //React Serve Code (Added This)
    /*app.use(express.static(path.join(__dirname, './public/build')))
    app.use('*', (_, res)=>{
        res.sendFile(path.resolve(__dirname, './public/build/index.html'))
    })*/
    

    //-------------------------------------------------------------Rest of Code-------------------------------------------------------------------//


    const publicPath = path.join(__dirname,'./public/build');
    app.use(express.static(publicPath));

    app.listen(4000,function(err) {
        if(err) {
            console.error('Server startup error');
        }
        else {
            console.log('Server running on port 4000');
        }
    });

    var routes = require('./server/index')(app);

    process.on('SIGINT',function() {
        console.log('App terminated and Connections are closed');
        process.exit(0);
    });

    module.exports = app;

})();