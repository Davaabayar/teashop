const express = require('express');
const router = express.Router();

//blog status:0 draft, status:1 published, status:2 deleted

router.get('/posts', async function (req, res) {
    let result = await req.db.collection('blog')
        .find({ status: 1 }).sort({ date: -1 }).toArray();
    res.send(result).status(200);
});

router.get('/posts/:page', async function (req, res) {
    let resultPerPage = 10;
    let page = req.params.page;

    let result = await req.db.collection('blog')
        .find({ status: 1 }).sort({ date: -1 }).skip((resultPerPage * page) - resultPerPage).limit(resultPerPage).toArray();
    res.send(result).status(200);
});

router.post('/posts', async function (req, res, next) {
    await req.db.collection("blog").insert({ ...req.body }, function (err, doc) {
        if (err) {
            next(err);
        }
        else {
            res.json({ "success": 1 }).status(201); //201 successfully created
        }
    });
});

router.put('/posts', function (req, res) {

});

router.delete('/posts/:id', function (req, res) {

});

module.exports = router;