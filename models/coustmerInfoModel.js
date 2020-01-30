const mongoose = require('mongoose');
const validator = require('validator');

const coustmerInfoSchema = new mongoose.Schema(
    {
        NAME: {
            type: String,
            required: true,

        },
        EMAIL: {
            type: String,
            required: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        PHONE: {
            type: String,
            required: true
        },
        Address: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        }
    }
)


const CoustmerInfo = mongoose.model('CoustmerInfo', coustmerInfoSchema);

module.exports = CoustmerInfo;