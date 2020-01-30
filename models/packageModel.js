const mongoose = require('mongoose');
const carBrand = require('./carBrandModel');

const packageSchema = new mongoose.Schema(
    {
        packageType: {
            type: String,
            required: [true, 'Package can not be empty!']
        },
        price: {
            type: Number
        },
        CheckingTime: {
            type: Number
        },
        Services: [],


    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    },

)


const Package = mongoose.model('Package', packageSchema);

module.exports = Package;