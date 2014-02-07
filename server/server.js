var express = require('express'),
	angular = require('../routes/public'),
	api = require('../routes/api'),
	path = require('path'),
	http = require('http');

var app = express();

app.set('port', 3000);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.logger());

//setup api routes
api.routes(app);

//setup additional routes to angular
angular.routes(app);

//create http server
var port = app.get('port');
http.createServer(app).listen(port, function()
{
	console.log("Http server started on port " + port);
});