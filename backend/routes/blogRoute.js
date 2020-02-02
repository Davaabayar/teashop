const express = require('express');
const router = express.Router();


router.get('/:page', async function (req, res) {
    let resultPerPage = 10;
    let page = req.params.page;

    let result = await req.db.collection('blog')
        .find({ status: "published" }).sort({ date: -1 }).skip((resultPerPage * page) - resultPerPage).limit(resultPerPage).toArray();
    res.send(result);
});

router.post('/', async function (req, res, next) {
    await req.db.collection("blog").insert({ ...req.body }, function (err, doc) {
        if (err) {
            next(err);
        }
        else {
            res.json({ "success": 1 }).status(201); //201 successfully created
        }
    });
});

router.put('/', function (req, res) {

});

router.delete('/', function (req, res) {

});

module.exports = router;