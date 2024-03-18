require("dotenv").config();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const sendMail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        // service: process.env.SMTP_SERVICE, 
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    });
    const {email,subject,template,data} = options;
    //get path to email template file
    const templatePath = path.join(__dirname,"../templates",template);
    console.log(transporter)
    console.log(data)
    //Render Mail Template with EJS
    const html = await ejs.renderFile(templatePath,data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    };
    console.log("mailOptions")
    console.log(mailOptions)

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendMail;