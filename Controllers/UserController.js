const bcrypt = require('bcrypt')
const Products = require('../Models/Products')
const User = require('../Models/User')
const Order = require('../Models/Order')
const Cart = require('../Models/Cart')
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try{
        //Check User
        const { email, password } = req.body
        //validate data
        switch(true){
            case !email:
                return res.status(400).json({error:"กรุณากรอก Email"})
                break;
            case !password:
                return res.status(400).json({error:"กรุณากรอกรหัสผ่าน"})
                break;
        }
        var user = await User.findOne({email})
        if(user){
            return res.status(400).json({error:"ไม่สามารถใช้ Email นี้ได้"})
        }
        const salt = await bcrypt.genSalt(10)
        user = new User({
            email,
            password
        })

        //Encrypt
        user.password = await bcrypt.hash(password, salt)
        await user.save();
        console.log('User registered successfully!')
        res.json({email, password})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.login = async (req, res) => {
    try {
        const { email , password } = req.body
        var user = await User.findOneAndUpdate({email}, { new: true})
        if (user && user.enabled){
            //Check Password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({error:"Email หรือ รหัสผ่านไม่ถูกต้อง!"})
            }
            //Payload
            const payload = { 
                user: {
                    email: user.email,
                    role: user.role
                }
            }
            //Generate Token
            jwt.sign(payload, process.env.JWTSECRET, {expiresIn : '1d' }, (err, token) => {
                if (err) throw err;
                res.json({token, payload})
            })
        }else {
            return res.status(400).json({error:"Email หรือ รหัสผ่านไม่ถูกต้อง!"})
        }
    }catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.currentUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email})
        .select('-password')
        .exec()
        res.json({user})
    }catch (err) {
        console.log(err);
        res.status(500).json("Server Error!");
    }
}

exports.userCart = async (req, res) => {
    try {
        const { cart } = req.body
        let user = await User.findOne({email:req.user.email}).exec()
        let products = []
        let cartOld = await Cart.findOne({orderBy:user._id}).exec()
        if(cartOld){
            cartOld.deleteOne()
        }

        for(let i = 0; i< cart.length; i++){
            let object = {}

            object.product = cart[i]._id
            object.count = cart[i].count
            object.price = cart[i].price
            
            products.push(object)
        }

        let cartTotal = 0
        for (let i = 0; i < products.length; i++){
            cartTotal = cartTotal + products[i].price * products[i].count
        }

        let newCart = await new Cart({
            products,
            cartTotal,
            orderBy: user._id
        }).save()

        console.log(newCart)
        res.send('userCart OK')
    }catch(err) {
        console.log(err)
        res.status(500).send('UserCart Server Error')
    }
}

exports.getUserCart = async (req, res) => {
    try{
        const user = await User.findOne({email: req.user.email}).exec()
        let cart = await Cart.findOne({orderBy: user._id}).populate('products.product','_id nameTH price content imageSrc quantity').exec()
        const { products, cartTotal } = cart
        res.json({products, cartTotal})
    }catch(err) {
        res.status(500).send('GetUserCart Error')
    }
}

exports.saveAddress = async (req, res) => {
    try{
        const userAddress = await User.findOneAndUpdate({email: req.user.email},{address: req.body.address}).exec()
        res.json({ok:true})
    }catch(err) {
        res.status(500).send('Save Address Error')
    }
}

exports.saveOrder = async (req, res) => {
    try{
        let user = await User.findOne({email: req.user.email}).exec()
        let userCart = await Cart.findOne({orderBy:user._id}).exec()
        let order = await new Order({
            products: userCart.products,
            orderBy: user._id,
            cartTotal: userCart.cartTotal
        }).save()

        let bulkOption = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter:{ _id:item.product._id },
                    update:{ $inc:{quantity: -item.count, sold: +item.count}}
                }
            }
        })
        

        //let updated = await Products.bulkWrite(bulkOption,{})
        res.send(bulkOption)
    }catch(err) {
        res.status(500).send("Save Order Error")
    }
}

exports.emptyCart = async (req, res) => {
    try{
        const user = await User.findOne({email: req.user.email}).exec()
        const empty = await Cart.findOneAndRemove({orderBy:user._id}).exec()
        res.send(empty)
    }catch(err) {
        res.status(500).send('Remove Cart Error')
    }
}

exports.getOrder = async (req, res) => {
    try{
        const user = await User.findOne({email: req.user.email}).exec()
        let order = await Order.find({orderBy: user._id}).populate('products.product').exec()
        res.json(order)
    }catch(err) {
        res.status(500).send('Get Order Error')
    }
}