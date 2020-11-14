import express from 'express';
import graphqlRoute from "./routes/graphql";

function createServer() {
    const app: express.Application = express();

    const rootHello = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send('Hello!');
    }

    app.get('/', rootHello);
    app.use('/graphql', graphqlRoute);

    return app;
}

export default createServer;

