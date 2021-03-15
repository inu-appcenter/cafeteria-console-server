import express from 'express';
import graphqlRoute from "./routes/graphql";
import cors from 'cors';
import signIn from "./routes/signIn";
import authenticate from "./routes/authenticate";
import hello from "./routes/hello";
import version from "./routes/version";
import cookieParser from 'cookie-parser';
import {isProduction} from "./utils/nodeEnv";
import config from "../config";
import discountLogs from "./routes/transactions";

function createServer() {
    const app: express.Application = express();

    app.use(cookieParser());
    app.use(cors({
        origin: isProduction() ? config.cors.allowedHostsInProduction : true,
        credentials: true
    }));

    app.use('/graphql', authenticate, graphqlRoute);
    app.get('/logs', authenticate, discountLogs);

    app.get('/', hello);
    app.get('/version', version);

    app.post('/sign-in', express.urlencoded({extended: true}), signIn)

    return app;
}

export default createServer;

