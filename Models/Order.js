const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    products: [
        {
            product: {
                type: ObjectId,
                ref: 'Products' //ต้องเหมือนกัน Product Model
            },
            count: Number,
            price: Number
        }
    ],
    cartTotal: Number,
    orderstatus: {
        type: String,
        default: 'Not Process'
    },
    orderBy: {
        type: ObjectId,
        ref: 'users'
    }
},{timestamps: true})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order