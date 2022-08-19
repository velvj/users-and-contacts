const mongoose = require('mongoose')
const Schema = mongoose.Schema


const contactSchema = new Schema({

    userId: { type: Schema.Types.ObjectId },
    contactId: { type: Schema.Types.ObjectId, ref: 'usermaster' }
}, { timestamp: true })



const mycontact = mongoose.model('contacts', contactSchema)

module.exports = mycontact;