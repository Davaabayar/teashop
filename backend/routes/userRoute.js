<<<<<<< HEAD
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
=======
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Get users for index');
});

>>>>>>> 146f7f163c97e3cf084f286865b891a8de540c2c
module.exports = router;