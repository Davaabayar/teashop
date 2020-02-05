const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const tokenService = require('../service/tokenService');

router.post('/add', tokenService.tokenCheck, async (req, res, next) => {
	let shop = req.body;
	const {decoded} = req;
	shop.location = [parseFloat(req.body.location.long), parseFloat(req.body.location.lat)];
	shop.user = {email: decoded.username};
	await req.db.collection("shops").insert(shop, function (err, doc) {
		if (err) next(err);
		else res.json({"success": 1, shop: shop});
	});
});

router.get('/nearest', tokenService.tokenCheck, async (req, res, next) => {
	const {limit, maxDistance, long, lat} = req.query;
	const {benefits} = req.decoded;
	const result = await req.db.collection('shops').find({
		"tags": {
			$in: benefits
		},
		"location": {
			$near: {
				$geometry: {type: "Point", coordinates: [parseFloat(long), parseFloat(lat)]},
				$maxDistance: parseInt(maxDistance)
			}
		}
	}, {multi:true}).limit(parseInt(limit)).toArray();
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

router.get('/has', tokenService.tokenCheck, async (req, res, next) => {
	const {decoded} = req;
	try {
		const result = await req.db.collection('shops').findOne({"user.email": decoded.username}, {"_id":1});
		res.status(200).json(result);
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
