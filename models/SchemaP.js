const mongoose = require('mongoose');

const dbSchema=new mongoose.Schema({
    Altitude: { type: Number, required: true },
    HSI: { type: Number, required: true }, 
    ADI: { type: Number, required: true }
});

module.exports = mongoose.model('SchemaP', dbSchema, 'myDB');
