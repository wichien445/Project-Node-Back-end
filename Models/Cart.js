const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema

const CartSchema = new Schema({
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
    orderBy: {
        type: ObjectId,
        ref: 'users'
    }
},{timestamps: true})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart