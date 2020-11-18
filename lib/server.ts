import express from 'express';
import graphqlRoute from "./routes/graphql";
import cors from 'cors';
import signIn from "./routes/signIn";
import authenticate from "./routes/authenticate";
import hello from "./routes/hello";
import version from "./routes/version";
import cookieParser from 'cookie-parser';
import {isProduction} from "./utils/nodeEnv";

function createServer() {
    const app: express.Application = express();

    app.use(cookieParser());
    app.use(cors({
        origin: isProduction() ? 'https://manage.inu-cafeteria.app' : true, credentials: true
    }));

    app.use('/graphql', authenticate, graphqlRoute);

    app.get('/', hello);
    app.get('/version', version);

    app.post('/sign-in', express.urlencoded({extended: true}), signIn)

    return app;
}

export default createServer;

