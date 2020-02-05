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

function tokenCheck(req, res, next) {
	console.log(req.headers["authorization"]);
	let bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		let bearer = bearerHeader.split(" ");
		req.token = bearer[1];
		let token = bearer[1];
		jwt.verify(token, process.env.privateKey, function (err, decoded) {
			if (err) res.status(400).send(err);
			else {
				req.decoded = decoded;
				return next();
			}
		});
		return next();
	} else {
		res.send(403);
	}
}
module.exports = {"signToken": signToken, 'getUser': getUser, 'tokenCheck': tokenCheck};