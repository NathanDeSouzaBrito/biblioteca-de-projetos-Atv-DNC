import "dotenv/config";
import userServices from "../service/userServices.js";
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).send({ error: "Token is required" });
    }

    const partsToken = tokenHeader.split(" ");
    if (partsToken.length !== 2) {
        return res.status(401).send({ error: "Token error" });
    }

    const [scheme, token] = partsToken;
    
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Token malformatted" });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Token invalid" });
        }

        const user = await userServices.findUserByIdService(decoded.id);
        if (!user || !user.id) {
            return res.status(401).send({ error: "Invalid token" });
        }
        req.userId = user.id;
        next();
    });
}