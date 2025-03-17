const mongoose = require('mongoose');
const User = require('../models/user');

exports.fetchAllUser = async (req, res)=>{
    try{
        const users =await User.find();
        res.status(200).json({
            success : true,
            message : "All users is Fetched",
            data : users,
        })
    }catch(error){
        res.status(500).json({
            success : false,
            error_message : error.message,
            fault : "Interval Server Error",
        })
    }

}

exports.fetchUserByEmail = async (req, res)=>{
    try {
        const {email} = req.body;
        const user = await User.find({email});
        res.status(200).json({
            success : true,
            message : `user fetched of email ${email}`,
            data : user,
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error_message : error.message,
            fault : "Interval Server Error",
        })
    }
}