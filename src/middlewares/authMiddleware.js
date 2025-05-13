import jwt from "jsonwebtoken";
import userService from "../services/userService.js";

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid Token Format" });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid or Expired Token" });
        }

        const { username } = decoded;
        if (!username) {
            return res.status(401).json({ message: "Invalid Token Payload" });
        }

        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User Not Found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error in authMiddleware:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default authMiddleware;
