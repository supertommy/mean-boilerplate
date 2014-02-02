'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//set test schema and model
var TestSchema = new Schema({
	message: String
});

var Test = mongoose.model('Test', TestSchema);

exports.initDB = function()
{
	Test.count(function(err, count)
	{
		if (err || count <= 0)
		{
			//add dummy data
			var test = new Test({
				message: 'hello api'
			});

			test.save();
		}
	});
};

exports.create = function(req, res)
{
};

exports.find = function(req, res)
{
	var id = req.params.id;
	Test.findById(id, function(err, object)
	{
		res.json({
			'result': 'success',
			'data': object
		});
	});
};

exports.delete = function(req, res)
{

};

exports.list = function(req, res)
{
	var test = Test.find(function(err, objects)
	{
		res.json({
			'result': 'success',
			'data': objects
		});
	});
};
