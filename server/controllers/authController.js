import bcyprt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModal from '../models/userModels.js';
import transporter from '../config/nodemailer.js';

// For New User Registration...
export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.json({success: false, message: 'Missing Details'});
    }

    try {
        const existingUser = await userModal.findOne({email});

        if(existingUser) {
            return res.json({success: false, message: 'User already exists'});
        }

        const hashedPassword = await bcyprt.hash(password, 10);

        const user = userModal({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        //Sending Welcome Email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome Developer',
            text: `Your account has been created with email id: ${email}`,
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// For User Login...
export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.json({success: false, message: 'Email and password are required'});
    }

    try {
        const user = await userModal.findOne({email});

        if(!user) {
            return res.json({success: false, message: 'Invalid email'});
        }

        const isMatch = await bcyprt.compare(password, user.password);

        if(!isMatch) {
            return res.json({success: false, message: 'Invalid password'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// For User Logout...
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({success: true, message: 'Logged Out'});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// For Send Verification OTP to the User's Email...
export const sendVerifyOtp = async (req, res) => {
    try {
        const {userId} = req.body;
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}