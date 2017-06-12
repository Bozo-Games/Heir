/**
 * Created by Bill Deckstop on 6/12/2017.
 */
var http = require('http');
var fs = require('fs');

var app = connect();


http.createServer(app).listen(8888);
console.log('Server is now running ');