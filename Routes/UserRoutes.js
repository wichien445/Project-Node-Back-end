const express = require("express")
const router = express.Router()
//Controllers
const { listUsers , readUsers , updateUsers , removeUsers , changeStatus, changeRole} = require('../Controllers/AdminUserController')
const { userCart, getUserCart, saveAddress, saveOrder, emptyCart, getOrder } = require('../Controllers/UserController')
// middleware
const { auth, adminCheck } = require('../Middleware/middleware')

//@Endpoint http://localhost:8080/api/users
//@Method GET
//@Access Private
//@Action List User
router.get('/users',auth, adminCheck, listUsers)

//@Endpoint http://localhost:8080/api/users/:id
//@Method GET
//@Access Private
//@Action List User By ID
router.get('/users/:id', readUsers)

//@Endpoint http://localhost:8080/api/users/:id
//@Method PUT
//@Access Private
//@Action Update User By ID
router.put('/users/:id', updateUsers)

//@Endpoint http://localhost:8080/api/users/:id
//@Method DELETE
//@Access Private
//@Action Delete User By ID
router.delete('/users/:id', removeUsers)

//@Endpoint  http://localhost:8080/api/change-status
//@Method    POST
//@Access    Private
//@Action    Change Status User
router.post("/change-status",auth, adminCheck, changeStatus)

//@Endpoint  http://localhost:8080/api/change-role
//@Method    POST
//@Access    Private
//@Action    Change Role User
router.post("/change-role",auth, adminCheck, changeRole)

//@Endpoint  http://localhost:8080/api/user/cart
//@Method    POST
//@Access    Private
//@Action    User Cart
router.post("/user/cart",auth, userCart)

//@Endpoint  http://localhost:8080/api/user/cart
//@Method    GET
//@Access    Private
//@Action    User Cart
router.get("/user/cart",auth, getUserCart)

//@Endpoint  http://localhost:8080/api/user/address
//@Method    POST
//@Access    Private
//@Action    User Address
router.post("/user/address",auth, saveAddress)

//@Endpoint  http://localhost:8080/api/user/order
//@Method    POST
//@Access    Private
//@Action    User Order
router.post("/user/order",auth, saveOrder)

//@Endpoint  http://localhost:8080/api/user/cart
//@Method    GET
//@Access    Private
//@Action    User Cart
router.delete("/user/cart",auth, emptyCart)

//@Endpoint  http://localhost:8080/api/user/order
//@Method    POST
//@Access    Private
//@Action    User History
router.get("/user/orders",auth, getOrder)

module.exports = router