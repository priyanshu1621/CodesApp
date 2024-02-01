const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPasswordToken -> mails end reset password
exports.resetPasswordToken = async (req, res) => {
    try {
        // get emails from the user
        const email = req.body.email;
        // check user for this email, email verify
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            });
        }
        // generate token -> build in function in node module
        const token = crypto.randomBytes(20).toString("hex");

        // console.log("Random token generate in reset Password", token);

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            { new: true }
        );
        console.log("DETAILS", updatedDetails);

        // create url
        const url = `http://localhost:3000/update-password/${token}`;


        // send mail containg the url
        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );


        res.json({
            success: true,
            message:
                "Email Sent Successfully, Please Check Your Email to Continue Further",
        });
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
        });
    }
};


// resetPassword -> update the latest password in the DB

exports.resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body;
        // validation
        if (confirmPassword !== password) {
            return res.json({
                success: false,
                message: "Password and Confirm Password Does not Match",
            });
        }

        // get user deatails from the DB using the token
        const userDetails = await User.findOne({ token: token });

        // if no enrty found -> Invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is Invalid",
            });
        }

        // check token expire time
        if (!(userDetails.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            });
        }

        // Now hashed the Password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // password Update
        await User.findOneAndUpdate(
            { token: token },
            { password: encryptedPassword },
            { new: true }
        );
        res.json({
            success: true,
            message: `Password Reset Successful`,
        });
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the Password`,
        });
    }
};