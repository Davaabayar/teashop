const mongoose = require('mongoose');

const teaSchema = mongoose.Schema({
    teaName: {type:String, required: true},
    shortName: String,
    description:String,
    cafine: String,
    flavors:[String],
    tags:[String],
    ingredients:String,
    brewInstruction:{
        temp:String,
        water:String,
        time: String,
        direction:String
    },
    category:String
});
    //name of the model, schema
module.exports = mongoose.model('Tea', teaSchema);

