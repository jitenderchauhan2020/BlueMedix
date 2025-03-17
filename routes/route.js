const express = require('express');
const router = express.Router();

const {createUser} = require('../controllers/createUser');
const {fetchAllUser, fetchUserByEmail} = require('../controllers/fetchUser');
const {updateUser} = require('../controllers/updateUser');
const {deleteUser} = require('../controllers/deleteUser');


router.post('/createUser', createUser);
router.get('/fetchUserByEmail', fetchUserByEmail);
router.get('/fetchAllUsers', fetchAllUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);

const {logIn, signUp} = require('../controllers/auth');
const {auth, isSeller, isCustomer, isAdmin} = require('../middlewares/auth');

//testing middlewares
router.get('/test', auth, (req, res)=> {
    res.status(200).json({
        success : true,
        message : "This is protectes route for test",
    })
})

router.post('/signup', signUp);
router.post('/logIn', logIn);


//middleware routes
router.get('/seller', auth, isSeller, (req, res) => {
    res.status(200).json({
        success :true,
        message : "It is protected route for seller",
    })
})

router.get('/admin', auth, isAdmin, (req, res)=>{
    res.status(200).json({
        success :true,
        message : "It is protected route for Admin",
    })
})

router.get('/customer', auth, isCustomer, (req, res)=>{
    res.status(200).json({
        success :true,
        message : "It is protected route for customer",
    })
})

module.exports = router;