const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    "name" : String,
    "age" : Number,
    "addresses":[{
     "country":String,
     "state":String,
     "city":String,
     "house":String    
    }
]   
}) 
module.exports = mongoose.model('Record',userSchema);