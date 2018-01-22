'use strict';
var path = require('path');
var express = require('express');
var app = express();
var httpsRedirect = require('express-https-redirect');
app.use('/', httpsRedirect());


// app.all(/.*/, function(req, res, next) {
//     var host = req.header("host");
//     if (host.match(/^www\..*/i)) {
//       next();
//     } else {
//       res.redirect(301, "https://www." + host);
//     }
//   });
//   app.use(express.static(__dirname + "/public"));

module.exports = app;

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));


/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});
// app.get('*', function(req, res) {
//     res.redirect('https://www.' + req.headers.host + req.url);

//     // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//     // res.redirect('https://example.com' + req.url);
// })

app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
