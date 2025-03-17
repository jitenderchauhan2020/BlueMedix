const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const cookie = require('cookie');
require('dotenv').config();


exports.logIn = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.status(500).json({
                success : false,
                message : "Input feilds not exist",
            })
        }

        //check if user exist or not
        let userExist = await User.findOne({email : email});
        if(!userExist){
            res.status(404).json({
                success : false,
                message : "user not found please signUp first",
            })
        }

        let payload = {
            email: userExist.email,
            password : userExist.password,
            role : userExist.role,
            id: userExist._id,
        }

        const options = {
            // 3 days expiration
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
            httpOnly: true, 
        };
        

        const isValidUser =await bcrypt.compare(password, userExist.password);

        if(isValidUser){
            //login successfullf
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "2h",
                header : {
                    "alg": "HS256",
                    "typ": "JWT"
                }
            });
            userExist = userExist.toObject();

            userExist.token = token;
            userExist.password = undefined;

            
            res.cookie("token", token, options).status(200).json({
                success : "cookie set successfully",
                httpOnly: true,
                data : userExist,
                token, 
            })

        }else{ 
            return res.status(404).json({
                success: false,
                message: "Enter Correct password",
            })
        }
    } catch (error) {
        console.log("Error found while login message is ->" + error);
    }
}


exports.signUp = async (req, res)=>{

    try {
        const {name, email, password, role} = req.body;
        
        //if user already exist
        const existinguser = await User.findOne({email : email});

        if(existinguser){
            return res.status(500).json({
                message : "User already exist",
                success : false,
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
        } catch (error) {
            console.log("cant able to hashed");
        }

        const newUser = await User.create({
            name : name,
            email : email,
            password : hashedPassword,
            role : role,
        })

        return res.status(201).json({
            success : true,
            message : "User created successfully",
            Data : newUser,
        })

    } catch (error) {
        console.log("error while signuo controller");
        res.status(500).json({
            error : error.message,
            message : "user not created,  Retry",
        })
    }
}