(function() {

    var connection = require('../configs/connection');

    module.exports.getParticipantsByEvent = function(event,callback) {
        try {
            var query = `select u.name,u.college,u.department,u.email,u.phone,u.college,ev.cname as event,u.eid,convert_tz(e.updated_at,'+00:00','+05:30') as time from users u
            join eventregistration e on u.eid = e.eid join events ev on ev.id=e.event where e.status=2 and ev.id=? order by 
            e.updated_at desc;`;
            connection.query(query,event,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.getEventsByUser = function(email,callback) {
        try {
            var query = "select cname,u.eid as eid from eventregistration er join events e on e.id=er.event join users u on u.eid=er.eid where email=? and status=2 and er.checkin=0;";
            connection.query(query,email,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.getEventsfromReg = function(email,callback) {
        try {
            var query = "select ev.cname,rg.email as email from regdump rg join events ev on rg.ticketname=ev.ticketname where email=? and rg.checkin=0"; //and rg.checkin=0
            connection.query(query,email,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

    module.exports.getCount = function(callback) {
        try {
            var query = `select ev.cname as Event,count(ev.id) as count from users u join eventregistration e on u.eid = e.eid join events ev 
            on ev.id=e.event where e.status=2 group by ev.ticketname order by count(ev.id) desc;`
            connection.query(query,function(err,data) {
                callback(err,data);
            });
        }
        catch(err) {
            callback(err);
        }
    };

})();