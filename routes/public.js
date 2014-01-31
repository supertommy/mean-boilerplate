exports.routes = function(app)
{
	//all other handle as 404
	app.get('*', function(req, res)
	{
		res.status(404);
		res.redirect('#/404');
	});
};