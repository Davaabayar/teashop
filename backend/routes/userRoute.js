const express = require('express');
const router = express.Router();

router.post('/signUp', async (req, res, next) => {
    await req.db.collection("users").insertOne({...req.body}, function (err, doc) {
		if(err)  next(err);
		else res.json({"success":1});
    });
})

router.get('/getQuiz', async(req, res, next) => {
    console.log(req.query.index)
    await req.db.collection("quiz").find({}, function (err, doc) {
		if(err)  next(err);
		else doc.toArray().then(data => {
            console.log(data)
            res.json(data)
        })
    });
})
module.exports = router;