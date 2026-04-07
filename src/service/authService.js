import jwt from 'jsonwebtoken';
import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import "dotenv/config";

function generateJWT(id) {
    return jwt.sign(
        { id },
        process.env.SECRET_JWT,
        { expiresIn: 86400 }    
    )
}

async function loginService(email, password) {
    const user = await userRepositories.findUserByEmailOrUsername(email);
    if (!user) throw new Error("Email ou senha incorretos.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Email ou senha incorretos.");
    const token = generateJWT(user.id);
    return token;
}

export { generateJWT, loginService };