const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
exports.createUser = async(req, res)=>{
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message: "send correct data, something is missing in the request"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
            // try {
            //     hashedPassword = await bcrypt.hash(password, 10);
            //     console.log(hashedPassword);
            // } catch (error) {
            //     console.log("cant able to hashed");
            // }

        const user =await User.create({name, email, password : hashedPassword, role});
        res.status(200).json({
            success : true,
            message : "Entry created successfully",
            data : user,
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Interval Server Error " + error.message,
            falut : error.message,
        })
        console.log(error.message);
        console.log("Error found while creating entry in controllers");
    }
}
