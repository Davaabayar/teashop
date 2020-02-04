const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function signToken(obj){
	return jwt.sign(obj, process.env.privateKey, {expiresIn: process.env.tokenDuration});
}

module.exports = {"signToken": signToken};