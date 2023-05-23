const jwt = require('jsonwebtoken')
const User = require('../Models/User')

exports.auth = (req, res, next) => {
    try{
        const token = req.headers['authtoken']
        if(!token){
            return res.status(401).json({error:"ไม่มี Token , การอนุญาตถูกปฏิเสธ"})
        }
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        console.log('middleware', decoded)
        req.user = decoded.user
        next()
    }catch(err) {
        console.log(err)
        res.status(401).json({error: "Token Invavid"})
    }
}

exports.adminCheck = async (req, res, next) => {
    try{
        const { email } = req.user
        const adminUser = await User.findOne({ email }).exec()
        if(adminUser.role !== 'admin'){
            res.status(403).send(err,'Admin Access Denied')
        }else {
            next()
        }
    }catch(err) {
        console.log(err)
        res.status(401).send('Admin Access Denied')
    }
}