var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//set test schema and model
var TestSchema = new Schema({
	message: String
});

var TestModel = mongoose.model('Test', TestSchema);

//connect to db
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () 
{
	console.log("connected to mongodb...");
	
	TestModel.count(function(err, count)
	{
		if (err || count <= 0)
		{
			//add dummy data
			var test = new TestModel({
				message: 'hello api'
			});

			test.save();
		}
	});
});

exports.test = function()
{
	return function(req, res)
	{
		var test = TestModel.find(function(err, objects)
		{
			res.send({
				'result': 'success',
				'objects': objects
			});
		});
	}
};