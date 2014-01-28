var express = require('express'),
	angular = require('./routes/public'),
	api = require('./routes/api'),
	path = require('path'),
	http = require('http');

var app = express();

app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));

//serve angular
angular.routes(app);

//setup api routes
api.routes(app);

//all other goes to angular front end
app.get('*', function(req, res)
{
	res.redirect('/');
});

//create http server
var port = app.get('port');
http.createServer(app).listen(port, function()
{
	console.log("Http server started on port " + port);
});