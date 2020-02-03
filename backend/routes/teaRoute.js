var express = require('express');
var router = express.Router();
const Tea = require('../models/tea');


router.get('/', async function(req, res, next) {   
    /*
    using mongodb
    let teas = await req.db.collection('teas').find({}).toArray();*/
    /*
    using mongoose and then()
    Tea.find().then(documents=>{
      console.log(documents);
      res.send(documents);
    });*/
    let teas = await Tea.find();
    console.log(teas);
    res.status(200).json(teas);
});

router.get('/:id', async function(req,res,next){
  Tea.findById(req.params.id)
    .then((result)=>{
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err=>{
      console.log(err);
      res.status(400).json(err);
    })

  
});


router.post('/', async function(req, res, next) {  
    const tea = new Tea(req.body);    
    const result = await tea.save();
    //let result = await req.db.collection('teas').insertOne(req.body);       
    res.status(201).json({
      message:"Tea added successfully",
      body:result
    })
  });

router.delete('/:id',(req,res,next)=>{
  Tea.deleteOne({_id:req.params.id}
  //   , function(err){
  //   if(err) {
  //     console.log(err);
  //     res.status(501).json({message:"Tea id not found"});
  //   }
  // }
  )
  .then(result=>{
      console.log(result);
      res.status(200).json({message:"Tea deleted!"});
    })
    .catch(err=>{
      console.log('Error during deletion',err);
      res.status(500);
    });
})

module.exports = router;