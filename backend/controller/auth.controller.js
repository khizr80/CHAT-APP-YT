import bcrypt from "bcrypt";
import User from '../model/user.model.js'
import generateWebTokenAndSetCookie from "../util/generateToken.js";
export const signup = async (req, res) => {
    
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "passwords dont match" })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "user already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const boy = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girl = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boy : girl
        })
        if (newUser) {
            generateWebTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(500).json({ error: "incorrect user data " })
        }
    } catch (error) {
        console.log("error in sign up controller", error.message)
        res.status(500).json({ error: "internal error message" })
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                generateWebTokenAndSetCookie(user._id, res)
                res.status(200).json({
                    _id: user._id,
                    fullName: user.fullName,
                    username: user.username,
                    gender: user.gender,
                    profilePic: user.profilePic
                })
            }
            else {
                res.status(401).json({ error: "incorrect password" })
            }
        }
        else {
            res.status(401).json({ error: "incorrect username" })
        }
    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({ error: "internal error message" })
    }
}




export const logout = async(req, res) => {
    try {
    res.cookie("jwt","",{maxAge:0}    )
    res.status(200).json({ message: "logged out successfully" })

    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({ error: "internal error message" })
        
    }
}