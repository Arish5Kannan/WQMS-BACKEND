import userService from './userService.js';
import { comparePassword } from "../utils/hash.js";
import jwt from 'jsonwebtoken';

async function login(username, password) {
    const user = await userService.getUserByUsername(username);

    if (!user) {
        throw new Error("User not found");
    }

    if (!await comparePassword(password, user.password)) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        { id: user.id, username: user.username ,user:user},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    );
    
    return { token};
}


export default { login };
