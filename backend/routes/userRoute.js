const express = require('express');
const tokenService = require('../service/tokenService')
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);

router.post('/signUp', async (req, res, next) => {
  try {
    console.log('working')

    let { fullname, password, email } = req.body;
    let encPass = await bcrypt.hash(password, saltRounds);
    let result = await req.db.collection("users").insertOne({
      "username": fullname,
      "email": email,
      "password": encPass
    });
    let token = await jwt.sign({
      "username": email,
      "fullname": fullname
    }, process.env.privateKey, { expiresIn: '30m' });
    console.log(token)
    res.json({ "success": 1, "token": token })

  } catch (err) {
    console.log(err)
    res.json(err)
  }
})

router.post('/signIn', async (req, res, next) => {
  try {
    let { email, password } = req.body
    let user = await req.db.collection("users").findOne({ "email": email });
    let result = await bcrypt.compare(password, user.password);
    let token = await jwt.sign({
      "username": email,
      "fullname": user.fullname,
      "benefits": user.benefits,
      "flavors": user.flavors
    }, process.env.privateKey, {expiresIn: '30m'});

    if (result) res.json({"success": 1, "token": token});
    else res.json({"success": 0});
  } catch(err) {
    res.json(err)
  }
})

router.post('/sendQuiz', async (req, res, next) => {
  const { token, quiz } = req.body
  const userInfo = tokenService.getUser(token)
  const benefits = Object.values(quiz.benefits)
  const flavors = Object.values(quiz.flavors)
  await req.db.collection("users").updateOne({ email: userInfo.username }, { $set: { benefits: benefits, flavors: flavors } }, function (err, doc) {
    let token = jwt.sign({
      "username": userInfo.username,
      "benefits": benefits,
      "flavors": flavors
    }, process.env.privateKey, {expiresIn: '30m'});
    res.json({"success":1, "token": token})
  });
})

router.get('/checkEmail', async (req, res, next) => {
  const { email } = req.query;
  const result = await req.db.collection("users").findOne({ "email": email });
  if (result) res.json({ "exists": 1 });
  else res.json({ "exists": 0 });
})

module.exports = router;