const mycontact = require('../model/mycontact')
const Users = require('../model/users')






const createUserId = async (req, res) => {
    try {
        const usersId = new mycontact({
            userId: req.body.userId,
            contactId: req.body.contactId
        });
        let data = await usersId.save();

        res.status(200).json({ status: 200, message: "successfully created", data: data })

    } catch (error) {
        console.log(error);
        if (error.code && error.code == 11000) {
            return res.status(400).json({ status: 400, message: "Already exists user!" });
        }
        res.status(400).json({ status: 400, message: error.message || error });
    }
}



const getAll = async (req, res) => {
    try {
        let o = {}
        // console.log(req.query.search);
        if (req.query.search) {
            o = { $or: [{ name: req.query.search }, { email: req.query.search }] }
            let usersObj = await Users.find(o).select('_id')
            o = { contactId: { $in: usersObj.map(x => x._id) } }
        }
        else if (req.query._id) {
            o = { _id: req.query._id }
        }
        console.log(o);
        let mydata = await mycontact.find(o).populate("contactId", "name phone email ").select(['-__v'])
        let data = mydata.map(function (val) {
            let obj = {
                id: val._id,
                userId: val.userId,
                contactId: val.contactId._id,
                name: val.contactId.name,
                email: val.contactId.email,
                phone: val.contactId.phone
            }
            return obj;
        })
        console.log(req.query.search)
        return res.status(200).json({ status: 200, message: "successfully listed", data: data })


    } catch (err) {
        console.log(err)
    }
}




module.exports = { getAll, createUserId }