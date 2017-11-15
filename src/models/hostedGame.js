const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostedGameSchema = new Schema({
	_id: String,
	date: Date,
	player1: String
});

module.exports = mongoose.model('hostedGame', hostedGameSchema);