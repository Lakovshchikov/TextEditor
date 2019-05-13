var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require(`fs`);
var pdf = require('html-pdf');

var app = express();


var routes = require("./routes/routing");
routes.dependencyInjections(fs,pdf);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', express.static("public/stylesheets"));
app.use('/scripts',express.static("public/javascripts"));
app.use('/docs',express.static("public/docs"));
app.use('/prints',express.static("public/prints"));

app.get('/', routes.index_page);
app.get('/open',routes.open);
app.post('/save', routes.save);
app.post('/print', routes.print);


module.exports = app;
