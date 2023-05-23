const express = require("express")
const router = express.Router()
const {addProduct, getAllproducts, singleProduct, changeStatusProduct, removeProduct, updateProduct} = require("../Controllers/ProductsController")
const { auth, adminCheck } = require('../Middleware/middleware')

//ADD PRODUCTS API
router.post('/addproduct', addProduct)
//GET ALL PRODUCTS API
router.get('/products', getAllproducts)
//GET SINGLE PRODUCTS API
router.get('/product/:slug', singleProduct)
//GET SINGLE PRODUCTS API
router.post('/product/change-status', changeStatusProduct)
//@Endpoint http://localhost:8080/api/users/:id
//@Method DELETE
//@Access Private
//@Action Delete User By ID
router.delete('/product/:id', removeProduct)
//@Endpoint http://localhost:8080/api/users/:id
//@Method DELETE
//@Access Private
//@Action Delete User By ID
router.put('/product/:id', updateProduct)

module.exports = router