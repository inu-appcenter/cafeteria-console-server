import express from 'express';

function createServer() {
    const app: express.Application = express();

    const router = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send('Hello!');
    }

    app.get('/', router);

    return app;
}

export default createServer;

