require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const authroute = require('./router/authroute')

const contactroute = require('./router/contactroute')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', authroute)
app.use('/contact', contactroute)

const port = process.env.PORT || 5000
app.listen(5000, () => { console.log(`server running on ${port}`) })