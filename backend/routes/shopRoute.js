const express = require('express');
const router = express.Router();

router.post('/add', async (req, res, next) => {
	await req.db.collection("shops").insert({...req.body}, function (err, doc) {
		if(err)  next(err);
		else res.json({"success":1});
	});
});

module.exports = router;
