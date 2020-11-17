import config from "../../config";
import express from "express";
import tokenManager from "../manager/TokenManager";

// TODO
function validateToken(token: string) {
    const decoded = tokenManager.decodeJwt(token);

    if (!decoded) {
        return false;
    }

    if (typeof decoded !== 'object') {
        return false;
    }

    // @ts-ignore
    if (!decoded.userName) {
        return false
    }

    // @ts-ignore
    if (decoded.userName !== config.auth.adminId) {
        return false;
    }

    return true;
}

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies['cafeteria-management-server-token'];

    if (token && validateToken(token)) {
        next();
    } else {
        res.status(401).send();
    }
}
