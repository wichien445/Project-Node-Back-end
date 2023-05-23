const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv').config()

const { readdirSync } = require('fs')

const app = express()

// MongoDB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(()=>console.log("Connect DataBase Succeed"))
.catch((err)=>console.console.log(err))

//Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '20mb'}))
app.use(cors())


readdirSync('./Routes')
.map((r)=> app.use('/api', require('./Routes/'+r)))

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Start Server In Port ${port}`)
})