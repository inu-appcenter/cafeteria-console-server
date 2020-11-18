import express from "express";
import config from "../../config";
import tokenManager from "../manager/TokenManager";
import logger from "../utils/logger";
import getEnv from "../utils/env";

// TODO
function authenticate(id: string, pw: string) {
    return (id === config.auth.adminId) && (pw === config.auth.adminPassword);
}

export default (req: express.Request, res: express.Response) => {
    const { id, password } = req.body;

    logger.verbose(`${id}님이 로그인을 하러 오셨군요...?`);

    if (authenticate(id, password)) {
        logger.verbose(`좋아, ${id}에게 로그인을 허가하여 주겠다....`);

        const jwt = tokenManager.createJwt({userName: config.auth.adminId});
        const options = {
            domain: config.cookie.domain,
            secure: getEnv('NODE_ENV') !== 'DEBUG',
        };

        res.cookie(config.cookie.tokenName, jwt, options)
            .status(201).send();
    } else {
        logger.verbose(`어림도 없지!!! ${id}, 당신은 아웃이야!`);

        res.status(401).send();
    }
}
