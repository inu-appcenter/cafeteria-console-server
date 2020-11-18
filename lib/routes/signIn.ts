import express from "express";
import config from "../../config";
import tokenManager from "../manager/TokenManager";
import logger from "../utils/logger";

// TODO
function authenticate(id: string, pw: string) {
    return (id === config.auth.adminId) && (pw === config.auth.adminPassword);
}

export default (req: express.Request, res: express.Response) => {
    const { id, password } = req.body;

    logger.verbose(`${id}, ${password}`);

    if (authenticate(id, password)) {
        res.cookie('cafeteria-management-server-token', tokenManager.createJwt({userName: config.auth.adminId}), {
            domain: config.cookie.domain
        }).status(201).send();
    } else {
        res.status(401).send();
    }
}
