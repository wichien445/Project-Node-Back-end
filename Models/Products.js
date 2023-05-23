const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        lowercase:true,
        unique:true
    },
    status: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    nameTH: {
        type: String,
        required: true,
    }
},{timestamps: true})

const Products = mongoose.model('Products', ProductsSchema)
module.exports = Products