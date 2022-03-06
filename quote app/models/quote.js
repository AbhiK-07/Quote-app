const mongoose = require('mongoose');


const quoteSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        require: true
    },
    description:{
        type: String,
        trim: true,
        require: true
    }
});


const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
