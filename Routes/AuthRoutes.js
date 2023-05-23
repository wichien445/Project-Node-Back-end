const express = require("express")
const router = express.Router()
//Controllers
const { login, register, currentUser} = require('../Controllers/UserController')

// middleware
const { auth, adminCheck } = require('../Middleware/middleware')

//@Endpoint http://localhost:8080/api/register
//@Method POST
//@Access Publish
//@Action Register New User
router.post('/register', register)

//@Endpoint http://localhost:8080/api/login
//@Method POST
//@Access Publish
//@Action Login User
router.post('/login', login)

//@Endpoint http://localhost:8080/api/current-user
//@Method POST
//@Access Private
//@Action Current User
router.post('/current-user',auth, currentUser)

//@Endpoint  http://localhost:8080/api/current-admin
//@Method    POST
//@Action    Current Admin
router.post("/current-admin", auth,adminCheck, currentUser);

module.exports = router