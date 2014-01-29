var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//set test schema and model
var TestSchema = new Schema({
	message: String
});

exports.Model = mongoose.model('Test', TestSchema);