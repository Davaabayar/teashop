const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);

router.post('/signUp', async (req, res, next) => {
  try{
    let {fullname, password, email} = req.body;
    let encPass = await bcrypt.hash(password, saltRounds);
    let token = jwt.sign({
      "username": fullname,
      "email": email
    }, "privateKey",{ expiresIn: '10m' });
    let result = await req.db.collection("users").insertOne({
      "username": fullname,
      "email": email,
      "password": encPass
    });
    res.json({"success":1, "token": token})
  } catch(err) {
    res.json(err)
  }
})

router.post('/signIn', async (req, res, next) => {
  try{
    let {email, password} = req.body
    let user = await req.db.collection("users").findOne({"email": email});
    let result = await bcrypt.compare(password, user.password);
    let token = await jwt.sign({
      "username": email,
    }, "privateKey", {expiresIn: '10m'});
    
    if (result) res.json({"success": 1, "token": token});
    else res.json({"success": 0});
  } catch(err) {
    res.json(err)
  }
})

router.get('/getQuiz', async(req, res, next) => {
    // console.log(req.query.index)
    await req.db.collection("users").find({}, function (err, doc) {
		if(err)  next(err);
		else doc.toArray().then(data => {
            // console.log(data)
            res.json(data)
        })
    });
})

router.get('/checkEmail', async (req, res, next) => {
  const {email} = req.query;
  console.log(email)
	const result = await req.db.collection("users").findOne({"email":email});
	if(result) res.json({"exists":1});
  else res.json({"exists":0});
})

module.exports = router;