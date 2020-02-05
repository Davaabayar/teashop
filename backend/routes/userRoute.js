const express = require('express');
const tokenService = require('../service/tokenService');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);

router.post('/signUp', async (req, res, next) => {
	try {
		let {fullname, password, email, userType} = req.body;
		let encPass = await bcrypt.hash(password, saltRounds);
		let result = await req.db.collection("users").insertOne({
			"username": fullname,
			"email": email,
			"userType": userType,
			"password": encPass
		});
		let token = await jwt.sign({
			"username": email,
			"fullname": fullname,
			"userType": userType
    }, process.env.privateKey, {expiresIn: process.env.tokenDuration});
    console.log('working')
		res.json({"success": 1, "token": token, "userType": userType})
	} catch (err) {
    console.log(err)
		res.json(err)
	}
})

router.post('/signIn', async (req, res, next) => {
  try {
    let { email, password } = req.body
    let user = await req.db.collection("users").findOne({ "email": email });
    let result = await bcrypt.compare(password, user.password);
    let token = await jwt.sign({
      "username": email,
      "fullname": user.fullname,
      "userType": user.userType,
      "benefits": user.benefits,
      "flavors": user.flavors
    }, process.env.privateKey, {expiresIn: process.env.tokenDuration});

    if (result) res.json({"success": 1, "token": token});
    else res.json({"success": 0});
  } catch(err) {
    res.json(err)
  }
})

router.post('/sendQuiz', async (req, res, next) => {
	const {token, quiz} = req.body
	const userInfo = tokenService.getUser(token)
	const benefits = Object.values(quiz.benefits)
	const flavors = Object.values(quiz.flavors)
	await req.db.collection("users").updateOne({email: userInfo.username}, {
		$set: {
			benefits: benefits,
			flavors: flavors
		}
	}, function (err, doc) {
		let token = jwt.sign({
			"username": userInfo.username,
			"benefits": benefits,
			"flavors": flavors
		}, process.env.privateKey, {expiresIn: process.env.tokenDuration});
		res.json({"success": 1, "token": token})
	});
})

router.get('/checkEmail', async (req, res, next) => {
	const {email} = req.query;
	const result = await req.db.collection("users").findOne({"email": email});
	if (result) res.json({"exists": 1});
	else res.json({"exists": 0});
});

router.get('/role', async (req, res, next) => {
	let bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		let bearer = bearerHeader.split(" ");
		req.token = bearer[1];
		let token = bearer[1];
		jwt.verify(token, process.env.privateKey, function (err, decoded) {
			if (err) {
				res.json({});
			}
			else {
				res.json(decoded);
			}
		});
	} else {
		res.json({});
	}
});

module.exports = router;