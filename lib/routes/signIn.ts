import express from "express";
import config from "../../config";
import tokenManager from "../manager/TokenManager";

// TODO
function authenticate(id: string, pw: string) {
    return (id === config.auth.adminId) && (pw === config.auth.adminPassword);
}

export default (req: express.Request, res: express.Response) => {
    const { id, password } = req.body;

    if (authenticate(id, password)) {
        res.cookie('token', tokenManager.createJwt({userName: config.auth.adminId})).status(201).send();
    } else {
        res.status(401).send();
    }
}
