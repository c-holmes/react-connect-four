const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostedGameSchema = new Schema({
	_id: String,
	dateCreated: Date,
	gameHostUser: String
});

module.exports = mongoose.model('hostedGame', hostedGameSchema);