const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const ProductSchema = new Schema({
    id: {
        type: Number
    
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
   
    tag: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    productCode: {
        type: String
    
    },
    condition: {
        type: String
    
    },
    quantity: {
        type: Number
    
    },
    availability: {
        type: Boolean,
        default: true
    },
    brand: {
        type: String
    
    },
    category: {
        type: String
    
    },
    rateCount: {
        type: Number
    
    },
    featured: {
        type: Boolean,
        default: false
    }
    ,
    ProductDescription: {
        type: String
    
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports =  Product;