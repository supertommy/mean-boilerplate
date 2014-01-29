var mongoose = require('mongoose');

//include controllers
var Test = require('../api/Test/TestController');

//connect to db
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () 
{
	console.log("connected to mongodb...");
	
	Test.initDB();
});

//setup routes
exports.routes = function(app)
{
	app.get('/api', function(req, res)
	{
		res.json({
			'result': 'success',
			'data': 'hello api'
		});
	})

	app.get('/api/test', Test.list);
	app.get('/api/test/:id', Test.find);
};