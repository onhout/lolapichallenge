/**
 * Created by pl on 8/28/15.
 */
module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index');
    });
    app.get('/champions', function(req, res){
        res.render('champions');
    });
    app.get('/firsts', function(req, res){
        res.render('firsts');
    });
    app.get('/topten', function(req, res){
        res.render('topten');
    });
    app.get('/teams', function(req, res){
        res.render('teams');
    });
};