import jwt  from "jsonwebtoken";
import User from "../model/user.model.js";
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(500).json({ error: "unAuthorized -no cookie found" })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) {
            return res.status(401).json({ error: "unAuthorized -invalid token" })
        }
        const user = await User.findById(verified.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("error in protect router ", error.message)
        res.status(500).json({ error: "internal error message" })

    }
}
export default protectRoute;