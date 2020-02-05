const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const tokenService = require('../service/tokenService');

function tokenCheck(req, res, next) {
	console.log(req.headers["Authorization"]);
	console.log(req.headers);
	let bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		let bearer = bearerHeader.split(" ");
		req.token = bearer[1];
		let token = bearer[1];
		jwt.verify(token, process.env.privateKey, function (err, decoded) {
			if (err) res.status(400).send(err);
			else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.send(403);
	}
}
router.post('/add', tokenCheck, async (req, res, next) => {
	let shop = req.body;
	shop.location = [parseFloat(req.body.location.long), parseFloat(req.body.location.lat)];
	await req.db.collection("shops").insert(shop, function (err, doc) {
		if (err) next(err);
		else res.json({"success": 1});
	});
});

router.get('/nearest', async (req, res, next) => {
	const {limit, maxDistance, long, lat} = req.query;
	const {tags} = req.decoded;
	const result = await req.db.collection('shops').find({
		"tags": {
			$in: tags
		},
		"location": {
			$near: {
				$geometry: {type: "Point", coordinates: [parseFloat(long), parseFloat(lat)]},
				$maxDistance: parseInt(maxDistance)
			}
		}
	}).limit(parseInt(limit)).toArray();
	res.status(200).json(result);
});

router.get('/', async (req, res, next) => {
	try {
		const result = await req.db.collection('shops').find({}).toArray();
		res.status(200).json({success: 1, arr: result});
	} catch (e) {
		return next(e);
	}
});
router.get('/detail/:id', async (req, res, next) => {
	try {
		const result = await req.db.collection('shops').findOne({_id: ObjectId(req.params.id)});
		res.status(200).json(result);
	} catch (e) {
		return next(e);
	}
});
module.exports = router;
