const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg");
    }
});

var upload = multer({ storage: storage });

router.get('/:id', function (req, res, next) {
    res.type('image/png');
    let p = process.env.uploadDir + req.params.id;
    if (fs.existsSync(p)) {
        fs.createReadStream(p).pipe(res);
    } else {
        res.send(null);
    }
});

router.post('/', upload.single('file'), function (req, res, next) {
    if (!req.file) next(err);
    res.json({
        "msg": "Image upload successful",
        imageUrl: '\/api\/upload\/' + req.file.filename
    }).status(200);
});

module.exports = router;