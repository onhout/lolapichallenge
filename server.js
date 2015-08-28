/**
 * Created by pl on 8/28/15.
 */
var express = require('express');
var jade = require('jade');
var path = require('path');
var app = express();

require('./server/config/routes.js')(app);
app.set('views', path.join(__dirname + '/client/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname + '/client/static')));
app.use(express.static(path.join(__dirname + '/client/views')));

app.listen(process.env.PORT || 1337, function(){
    console.log('server start 1337')
});