const userModel = require("../models/schema/user.model");
const ErrorHandler = require("../sharedutils/ErrorHandler");
const { CatchAsyncError } = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../sharedutils/sendMail");
require("dotenv").config();
process.env.ACTIVATION_SECRET;

exports.registrationUser = CatchAsyncError(async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        console.log(req.body)
        const emailExists = await userModel.findOne({ email });
        console.log("emailExists :"+ emailExists)
        if (emailExists) {
            return new ErrorHandler("Email already exists", 400)
        }
        console.log("Email doesn't exists")
        const userData = { email, name, password }
        const activationCode = Math.floor(1000 + Math.random() * 9000).toString(); //generates 4 digit number
        console.log("activationCode : " + activationCode)
        const activationToken = this.createActivationToken(userData, activationCode); //returns token
        console.log("activationToken : " + activationToken)
        const mailData = { user: { name: userData.name }, activationCode };
        const mailerTemplate = ejs.renderFile(path.join(__dirname, "../templates/activation-mail.ejs"), mailData);
        try {
            await sendMail({
                email:email,
                subject:"Activate your account",
                template: "activation-mail.ejs",
                data : mailData
            })
            res.status(201).json({
                success:true,
                message:`Please check you email: ${email} to activate your account`,
                activationToken : activationToken
            })
        } catch (error) {
            return next(new ErrorHandler(error.message,400));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

exports.createActivationToken = (userData, activationCode) => {
    const payload = { userData, activationCode };
    const secretOrPrivateKey = process.env.ACTIVATION_SECRET;
    const jwtOptions = { expiresIn: "5m" };
    // JWT.sign takes {Payload}, Secret Key, Options
    const token = jwt.sign(payload, secretOrPrivateKey, jwtOptions)
    return token;
}