const express = require('express');
const router = express.Router();
const tokenService = require('../service/tokenService');
const { ObjectID } = require('mongodb');

//blog status:0 draft, status:1 published, status:2 deleted

router.get('/posts/one', async function (req, res, next) {
    let result = await req.db.collection('blog')
        .findOne({ _id: ObjectID(req.query.id) }, function (err, result) {
            if (err) next(err);
            res.send(result).status(200);
        });
});

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

router.post('/posts', tokenService.tokenCheck, async function (req, res, next) {
    req.body._id = undefined;
    const {decoded} = req;
    req.body.user = {email: decoded.username};
    await req.db.collection("blog").insert({ ...req.body }, function (err, doc) {
        if (err) {
            next(err);
        }
        else {
            res.json({ "success": 1 }).status(201); //201 successfully created
        }
    });
});

router.put('/posts', async function (req, res, next) {
    let id = req.body._id;
    req.body._id = undefined;
    await req.db.collection("blog").updateOne({ "_id": ObjectID(id) },
        {
            $set: {
                title: req.body.title,
                summary: req.body.summary,
                thumbnail: req.body.thumbnail,
                body: req.body.body,
                created: new Date(req.body.created),
                updated: req.body.updated ? new Date(req.body.updated) : null,
                createdBy: req.body.createdBy,
                updatedBy: req.body.updatedBy,
                status: req.body.status
            }
        }, function (err, doc) {
            if (err) {
                next(err);
            }
            else {
                res.json({ "success": 1 }).status(200); //201 successfully updated
            }
        });
});

router.delete('/posts/:id', function (req, res) {
    req.db.collection("blog").deleteOne({ "_id": ObjectID(req.params.id) });
    res.json({ success: 1 });
});

module.exports = router;