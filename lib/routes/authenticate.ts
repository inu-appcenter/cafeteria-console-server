import config from "../../config";
import express from "express";
import tokenManager from "../manager/TokenManager";
import logger from "../utils/logger";

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
    const token = req.cookies[config.cookie.tokenName];

    if (token && validateToken(token)) {
        next();
    } else {
        logger.info(`${req.ip}님께서 은밀한 접근을 시도하셨군요...? 후후훗...`);
        res.status(401).send();
    }
}
