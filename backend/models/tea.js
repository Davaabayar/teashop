const mongoose = require('mongoose');

const teaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type:String, required: true},
    shortName: {type:String, required: true},
    description:String,
    cafine: String,
    flovors:[String],
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

