var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();
const Tea = require('../models/tea');

/*
GET http://localhost:3000/api/teas?tags=Anti-ageing&flavors=Orange,Mango
GET http://localhost:3000/api/teas?flavors=Joy&tags=Anti-ageing
GET http://localhost:3000/api/teas?flavors=Mango,Orange
GET http://localhost:3000/api/teas?tags=Anti-ageing
GET http://localhost:3000/api/teas
*/
router.get('/', async function (req, res) {
  tags = [];
  flavors = [];
  qType = 0;
  result = [];

  if (req.query.tags != null) tags = req.query.tags.split(',');
  if (req.query.flavors != null) flavors = req.query.flavors.split(',');

  if (tags.length > 0 & flavors.length == 0) qType = 1;
  if (tags.length == 0 & flavors.length > 0) qType = 2;
  if (tags.length > 0 & flavors.length > 0) qType = 3;

  switch (qType) {
    case 1:
      result = await req.db.collection('teas')
        .find(
          { "tags": { $in: tags } }
        ).sort({ teaName: -1 }).toArray();
      break;
    case 2:
      result = await req.db.collection('teas')
        .find(
          { "flavors": { $in: flavors } }
        ).sort({ teaName: -1 }).toArray();
      break;
    case 3:
      result = await req.db.collection('teas')
        .find({
          $and: [
            { "tags": { $in: tags } },
            { "flavors": { $in: flavors } }
          ]
        }).sort({ teaName: -1 }).toArray();
      break;
    default:
      result = await req.db.collection('teas')
        .find({}).sort({ teaName: -1 }).toArray();
      break;
  }

  res.send(result).status(200);
});

router.get('/:id', async function (req, res) {
  let result = await req.db.collection('teas')
    .find({ _id: ObjectId(req.params.id) }).toArray();
  res.send(result).status(200);
});

router.post('/', async function (req, res, next) {
  await req.db.collection("teas").insert({ ...req.body }, function (err, doc) {
    if (err) {
      next(err);
    }
    else {
      res.json({ success: 1, body: doc }).status(201);
    }
  });
});

router.delete('/:id', async function (req, res) {
  let result = await req.db.collection('teas')
    .deleteOne({ _id: req.params.id });
  res.send(result).status(200);
});

/*router.get('/:id', async function(req,res,next){
  Tea.findById(req.params.id)
    .then((result)=>{
      res.status(200).json(result);
    })
    .catch(err=>{
      res.status(400).json(err);
    })  
});

router.post('/', async function(req, res, next) {  
    const tea = new Tea(req.body);    
    const result = await tea.save();  
    res.status(201).json({
      message:"Tea added successfully",
      body:result
    });
  });

router.delete('/:id',(req,res,next)=>{
  Tea.deleteOne({_id:req.params.id})
  .then(result=>{     
      res.status(200).json({message:"Tea deleted!"});
    })
    .catch(err=>{   
      res.status(500);
    });
})

router.delete('/',(req,res,next)=>{
  Tea.deleteMany({})
  .then(result=>{     
      res.status(200).json({message:"Teas deleted!"});
    })
    .catch(err=>{   
      res.status(500);
    });
})

router.put('/:id', (req, res, next) => {
  const tea = new Tea({...req.body});
  console.log('put',{...req.body});

  Tea.updateOne({_id:req.params.id}, tea).then(result => {
    console.log(result);
    res.status(200).json({message:"Update successful!"});
  });
})
*/
module.exports = router;