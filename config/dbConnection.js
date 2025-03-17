const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

const dbConn = async (req, res) => {
    try {
        await mongoose.connect(url)
            .then((result) => {console.log("DB connect successfully")})
            .catch((err) => {console.log("Error found while making connection in DB -> " + err)});
    } catch (err) {
        console.log("Error in Db connection error -> " + err);
    }
}
module.exports = dbConn;