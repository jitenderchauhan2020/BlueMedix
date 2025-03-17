const mongoose = require('mongoose');
const User = require('../models/user');

exports.createUser = async(req, res)=>{
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message: "send correct data, something is missing in the request"
            })
        }

        const user =await User.create({name, email, password, role});
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
