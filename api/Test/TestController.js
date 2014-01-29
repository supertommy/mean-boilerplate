var Test = require('./TestModel');

exports.initDB = function()
{
	Test.Model.count(function(err, count)
	{
		if (err || count <= 0)
		{
			//add dummy data
			var test = new Test.Model({
				message: 'hello api'
			});

			test.save();
		}
	});
}

exports.create = function(req, res)
{

};

exports.find = function(req, res)
{
	var id = req.params.id;
	Test.Model.findById(id, function(err, object)
	{
		res.json({
			'result': 'success',
			'data': object
		})
	});
};

exports.delete = function(req, res)
{

};

exports.list = function(req, res)
{
	var test = Test.Model.find(function(err, objects)
	{
		res.json({
			'result': 'success',
			'data': objects
		});
	});
};
