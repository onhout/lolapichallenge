/**
 * Created by pl on 8/28/15.
 */
var fs = require('fs');
exports.getChampion = function(res, champName){
    fs.readdir('./client/static/asset/champion', function(err, files){
        if (files.indexOf(champName.toLowerCase()+'.json') >= 0 ){
            fs.readFile('./client/static/asset/champion/'+files[files.indexOf(champName.toLowerCase()+'.json')], 'utf8',  function(err, data){
                res.render('champion', JSON.parse(data));
            });
        } else {
            res.render('champions');
        }
    });

};