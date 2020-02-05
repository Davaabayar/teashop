const jwt = require('jsonwebtoken');

function signToken(obj) {
	return jwt.sign(obj, process.env.privateKey, {expiresIn: process.env.tokenDuration});
}

function getUser(token) {
	let userInfo
	jwt.verify(token, process.env.privateKey, function (err, decode) {
		if (err) console.log(err)
		console.log(decode)
		userInfo = decode
	})
	return userInfo
}

module.exports = {"signToken": signToken, 'getUser': getUser};