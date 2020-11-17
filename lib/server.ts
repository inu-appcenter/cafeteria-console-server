import express from 'express';
import graphqlRoute from "./routes/graphql";
import cors from 'cors';
import signIn from "./routes/signIn";
import authenticate from "./routes/authenticate";
import cookieParser from 'cookie-parser';

function createServer() {
    const app: express.Application = express();

    const rootHello = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send('Hello! Nice to see you!');
    }

    app.use(cookieParser());

    app.use(cors());
    app.use('/graphql', authenticate, graphqlRoute);

    app.get('/', rootHello);
    app.post('/sign-in', express.urlencoded({extended: true}), signIn)

    return app;
}

export default createServer;

