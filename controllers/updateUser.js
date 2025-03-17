const mongoose = require('mongoose');
const User = require('../models/user');

exports.updateUser = async(req, res)=> {
    try {
        const id = req.params.id;
        const {name, email, role } = req.body;

        const user = await User.findByIdAndUpdate(
            {_id : id}, 
            {name, email, role});

        if(!user){
            return res.status(404).json({
                success : false,
                message : `Item Not Found by id ${id}`,
                data : "Not avialable",
            })
        }

        res.status(200).json({
            success : true,
            message: "Item Updated successfully",
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            error_message : error.message,
            fault : "Interval Server Error",
        })
    }
}