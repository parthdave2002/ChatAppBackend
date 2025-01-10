const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const nodemailer = require("nodemailer");

const LoginController = async(req, res) =>{

    try {
        const { email , password} = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message : "Email does not exist",
                success : false
            })
        }
    
        const valid_password = await bcrypt.compare(password, user?.password);
        if(!valid_password){
            return res.status(400).json({
                message : "Password not matched",
                success : false
            })
        }

        const token = jwt.sign( { email, password }, SECRET_KEY, { expiresIn: '1h'});
        return res.status(200).json({
            data: user,
            token : token,
            message : "Login successfully",
            success : true
        })   
    } catch (error) {
        return res.status(500).json({
            message : error?.message,
            success : false
        })
    }
}

const ForgotpasswordController = async(req, res) =>{

    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message : "Email does not exist",
                success : false
            })
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
        });

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {expiresIn: "10m",});
        const link = `${process.env.CLIENT_URL}/reset-password/${token}/${user._id}`;

        await User.findByIdAndUpdate(user._id,{
            token : token,
        })

        await transporter.sendMail({
            from: email, 
            to: "parth.dave@cmarix.com", 
            subject: "Reset Password link", 
            text: "Hello world 123?", 
            html:  `<html>
              <head>
                <style>
                  body {
                    font-family: 'Georgia', serif;
                  }
                  a {
                    font-family: 'Verdana', sans-serif;
                    color: #1a73e8;
                    text-decoration: none;
                  }
                </style>
              </head>
              <body>
                <p>Reset Your Password:</p>
                <a href="${link}">Click here to reset your password</a>
                <p>The link will expire in 10 minutes.</p>
              </body>
            </html>`
        });
    
        return res.status(200).json({
            message : "Reset password link shared on your mail id. Please check mail",
            success : true
        })   
    } catch (error) {
        return res.status(500).json({
            message : error?.message,
            success : false
        })
    }
}

const VetifylinkController = async(req, res) =>{

    try {
        const { token, user_id } = req.body;

        const CheckUser = await User.findById(user_id);     
        if(CheckUser == null){
            return res.status(400).json({
                message : "user not found",
                success : false
            });  
        }

        const CheckToken = await User.findOne({ token : token});
        if(!CheckToken){
            return res.status(200).json({
                message : "invalid token",
                success : false
            });  
        }
       
        return res.status(200).json({
            message : "token verified",
            success : true
        });   
    } catch (error) {
        return res.status(500).json({
            message : error?.message,
            success : false
        })
    }
}

const ResetPasswordController = async(req, res) =>{

    try {
        const { password, user_id } = req.body;
        const ValidUser = await User.findById(user_id);     
        if(ValidUser == null){
            return res.status(400).json({
                message : "user not found",
                success : false
            });  
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const valid_password = await bcrypt.compare( password, ValidUser?.password);
        if(valid_password){
            return res.status(400).json({
                message : "This is your current password. Please try another password",
                success : false
            });  
        }

         await User.findByIdAndUpdate(user_id, {password : hashedPassword });
        return res.status(200).json({
            message : "Password updated successfully",
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error?.message,
            success : false
        })
    }
}

module.exports = { LoginController, ForgotpasswordController, VetifylinkController, ResetPasswordController }