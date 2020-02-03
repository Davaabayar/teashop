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
    })
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

router.put('/:id', (req, res, next) => {
  const tea = new Tea({...req.body});
  console.log('put',{...req.body});

  Tea.updateOne({_id:req.params.id}, tea).then(result => {
    console.log(result);
    res.status(200).json({message:"Update successful!"});
  });
})

module.exports = router;