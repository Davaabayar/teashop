const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signUp', async (req, res, next) => {
  let {username, password, email} = req.body;
  let encPass = await bcrypt.hash(password, saltRounds);
  let token = jwt.sign({
    "username": username,
    "email": email
  }, "privateKey",{ expiresIn: '10m' });
  let result = await req.db.collection("users").insert({
    "username": username,
    "email": email,
    "password": encPass
  });
  res.json({"success":1, "token": token})
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

/* POST users listing. */
// router.post('/', async (req, res, next) => {
// 	let {username, password} = req.body;
// 	let user = await req.db.collection("users").findOne({"username": username});
// 	let result = await bcrypt.compare(password, user.password);
// 	let token = jwt.sign({
// 		"username": username,
// 	}, "privateKey", {expiresIn: '10m'});
	
// 	// res.setHeader("Authorization", "Bearer " + token);
// 	if (result) res.json({"success": 1, "token": token});
// 	else res.json({"success": 0});
// });



// router.post('/', async (req, res, next) => {
//   let {username, password, email} = req.body;
//   let encPass = await bcrypt.hash(password, saltRounds);
//   let token = jwt.sign({
//     "username": username,
//     "email": email
//   }, "privateKey",{ expiresIn: '10m' });
//   let result = await req.db.collection("users").insert({
//     "username": username,
//     "email": email,
//     "password": encPass
//   });
//   // res.setHeader("Authorization", "Bearer " + token);
//   res.json({"success":1, "token": token})
// });


module.exports = router;