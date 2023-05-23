const bcrypt = require('bcrypt')
const Order = require('../Models/Order')
const User = require('../Models/User')
const jwt = require("jsonwebtoken")

exports.listUsers = async (req, res) => {
    try{
        const user = await User.find({}).select("-password").exec()
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Server Error"})
    }
}

exports.readUsers = async (req, res) => {
    try{
        const id = req.params.id
        const user = await User.findOne({_id: id}).exec()
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Server Error"})
    }
}

exports.updateUsers = async (req, res) => {
    try{
        
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Server Error"})
    }
}

exports.removeUsers = async (req, res) => {
    try{
        const id = req.params.id
        const user = await User.findOneAndDelete({_id: id})
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Server Error"})
    }
}

exports.changeStatus = async (req, res) => {
    try {
      // Code
        console.log(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { enabled: req.body.enabled }
        );
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
}

exports.changeRole = async (req, res) => {
    try {
      // Code
        console.log(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { role: req.body.role }
        );
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
}

exports.getOrderAdmin = async (req, res) => {
    try{
        let order = await Order.find().populate('products.product').populate("orderBy","email").exec()
        res.json(order)
    }catch(err) {
        res.status(500).send('Get Order Error')
    }
}

exports.changeOrderStatus = async (req, res) => {
    try {
        const { orderId, orderstatus} = req.body.orderId
        let orderUpdate = await Order.findByIdAndUpdate(
            orderId,
            {orderstatus},
            {new: true}
        )
            res.send(orderUpdate)
    } catch (err) {
        res.status(500).send("Update Status Error!!");
    }
}