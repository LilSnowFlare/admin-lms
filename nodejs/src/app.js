const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

//dotenv
require("dotenv").config();
//body-parser
app.use(express.json({ limit: "50mb" }));
//cookie-parser
app.use(cookieParser());
//cors
app.use(cors({
    origin: process.env.ORIGIN
}));
//Throw Errors in middleware
const ErrorMiddleware = require("./middleware/error");
app.use(ErrorMiddleware);

//routes
const userRouter = require("./routes/routes");
app.use("/api/v1",userRouter)

//health API
app.get('/', async (req, res, next) => {
    console.log("Hiii")
    res.status(200).send("Hii")
})
app.get('/health', async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Application is working`
    })
})

//Unknown Routes
app.all("*", async (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} does not exist`);
    err.statusCode = 404;
    next(err);
});

module.exports = app;