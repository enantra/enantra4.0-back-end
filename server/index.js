(function() {

    module.exports = function(app) {

        app.use('/api',require('./routers/actionRouter'));
        app.use('/api/user',require('./routers/userRouter'));
        app.use('/api/hospi/get',require('./routers/getValueRoutes'));

    };

})();