const express = require("express")
const router = express.Router()

// middleware
const { auth, adminCheck } = require('../Middleware/middleware')
//Controllers
const { getOrderAdmin , changeOrderStatus } = require('../Controllers/AdminUserController')

//@Endpoint http://localhost:8080/api/users
//@Method GET
//@Access Private
//@Action List User
router.get('/admin/orders', getOrderAdmin)

//@Endpoint http://localhost:8080/api/users
//@Method GET
//@Access Private
//@Action List User
router.put('/admin/order-status', changeOrderStatus)


module.exports = router