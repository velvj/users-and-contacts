const User = require('../model/users')
const bcrypt = require('bcryptjs');




const register = async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        });
        const savedUser = await user.save();
        res.status(200).json({ status: 200, message: "success", data: savedUser });
    } catch (error) {
        console.log(error);
        if (error.code && error.code == 11000) {
            return res.status(400).json({ status: 400, message: "Already exists user!" });
        }
        res.status(400).json({ status: 400, message: error.message || error });
    }
}


const login = async (req, res, next) => {
    try {
        var username = req.body.username
        var password = req.body.password
        const user = await User.findOne({ $or: [{ email: username }] })

        if (user) {
            const result = await bcrypt.compare(password, user.password)
            console.log(result, user.password, password);

            if (result) {
                let token = user.generateToken();
                // console.log(token); 
                const data = { "name": user.name, "email": user.email, "phone": user.phone, "token": token };

                return res.header("x-auth-token", token).status(200).json({ status: 200, message: 'login succesfully', data: data })

            }

            else {
                return res.json("incorrect password")
            }
        }
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message || error });
    }
}


const getlist = async (req, res) => {
    try {
        console.log(req.user, "test");
        let listdata = await User.find({ _id: { $nin: [req.user._id] } }).select(['-password', '-__v', '-_id']);
        return res.status(200).json({ status: 200, message: "successfully listed", data: listdata })

    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    register, getlist, login
}