const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name:
    {
        type: String
    },
    email:
    {
        type: String,
        unique: true
    },
    phone:
    {
        type: Number,
        unique: true
    },
    password:
    {
        type: String
    }
}, { timestamp: true })

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN)
    return token;
}


const userdatas = mongoose.model('usermaster', userSchema)

module.exports = userdatas;