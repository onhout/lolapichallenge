/**
 * Created by pl on 8/28/15.
 */
module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index');
    });
};