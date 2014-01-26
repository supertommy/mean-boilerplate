exports.routes = function(app)
{
	app.get('/api', function(req, res)
	{
		res.json({
			'result': 'success',
			'message': 'hello api'
		});
	});
};