var api = require('../api/api.js');

exports.routes = function(app)
{
	app.get('/api', api.test());
};