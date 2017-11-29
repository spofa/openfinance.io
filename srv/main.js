'use strict';
//naming conventions subpar
var server = require('http').createServer();
//dont need db atm
//var startDb = require('./db');



var createApp = () => {
    var app = require('./app');
    return server.on('request', app);
}

var start = () => {
    var PORT = process.env.PORT || 5185;

    server.listen(PORT, ()=>{
        console.log('ethOne Ethereum Kovan Server started on port:', PORT)
    })
}
//insert DB first and return promise (do we want db to record eth processes for now? testing )
//startDb.then(
    createApp();
    //.then(
        start();
        //.catch((error)=>{
    //console.error(error.stack);
    //process.exit(1);
//})

