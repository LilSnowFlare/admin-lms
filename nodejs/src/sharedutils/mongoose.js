const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/lmsdb';
// const dbUrl = 'mongodb://127.0.0.1:27017/lmsdb?directConnection=true&serverSelectionTimeoutMS=2000&appname=MongoDB%20Compass&ssl=false';

const connectDB = async () =>{
    try {
        await mongoose.connect(dbUrl).then((data)=>{
            console.log(`Database Connected Successfully with ${data.connection.host}`)
        })
    } catch (error) {
        console.log(error.message);
        setTimeout(connectDB,5000);
    }
}
exports.connectDB = connectDB;
