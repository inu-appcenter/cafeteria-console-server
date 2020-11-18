import express from "express";

export default (req: express.Request, res: express.Response) => {
    res.send(process.env.npm_package_version);
}
