const mongoose = require('mongoose');
const User = require('../models/user')

exports.deleteUser = async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({
                success : false,
                message : `Item Not Found by id ${id}`,
                data : "Not avialable",
            })
        }

        res.status(200).json({
            success : true,
            message: "Item Deleted successfully",
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