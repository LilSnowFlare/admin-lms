const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// name, email, password, avatar, role, isVerified, courses
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be atleast 6 characters"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [{
        courseId: String,
    }]
}, { timestamps: true })

userSchema.pre("save", async (next) => {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
module.exports = mongoose.model("User", userSchema);