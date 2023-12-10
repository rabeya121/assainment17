//body lib import
const express = require('express')
const app = express()


// security Middleware lib import
const ratelimit = require('express-rate-limit')
const helmet = require('helmet')
const mongooseSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
// database import 

const mongoose = require('mongoose')
const router = require('./src/router/api')

// security middleware implement
app.use(cors())
app.use(helmet())
app.use(mongooseSanitize())
app.use(xss())
app.use(hpp())
app.use(express.json())

// request rateLimit
const limiter = ratelimit({windowMs: 15 * 60 * 1000, max:3000})
app.use(limiter)
app.use(express.urlencoded({ extended: true }))


app.use('/api', router)
// database connection
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Database connection successfully"))
  .catch((error => console.log(error)));



  module.exports = app