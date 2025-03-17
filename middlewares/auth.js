//isAuthN, isAuthZ, 
//auth, isStudent, isAdmin
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        // console.log("body " + req.body.token);
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "send token with request",
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
        } catch (error) {
            res.status(401).json({
                message: "Invalid token",
                success: false,
                fault: "fault -> " + error,
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "auth error -> " + error,
            auth: "Authentication failed while token verification",
        })
    }
}

exports.isSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
        res.status(402).json({
            success: false,
            message: "this is protected route for seller ",
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        res.status(402).json({
            success: false,
            message: "this is protected route for Admin ",
        })
    }
    next();
}

exports.isCustomer = (req, res, next) => {
    if (req.user.role !== "customer") {
        res.status(402).json({
            success: false,
            message: "this is protected route for customer ",
        })
    }
    next();
}


