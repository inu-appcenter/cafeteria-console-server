import express from 'express';
import graphqlRoute from "./routes/graphql";
import cors from 'cors';

function createServer() {
    const app: express.Application = express();

    const rootHello = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send('Hello! Nice to see you!');
    }

    app.use(cors());
    app.get('/', rootHello);
    app.use('/graphql', graphqlRoute);

    return app;
}

export default createServer;

