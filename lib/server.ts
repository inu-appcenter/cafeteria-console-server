import cors from 'cors';
import hello from './interfaces/routes/hello';
import login from './interfaces/routes/login';
import config from '../config';
import version from './interfaces/routes/version';
import express from 'express';
import graphql from './interfaces/routes/graphql';
import cookieParser from 'cookie-parser';
import authenticate from './interfaces/routes/authenticate';
import {isProduction} from './utils/nodeEnv';
import discountRecords from './interfaces/routes/discountRecords';
import validateRecordsRequest from './interfaces/routes/validateRecordsRequest';

function startServer() {
  const app: express.Application = express();

  app.use(cookieParser());
  app.use(express.urlencoded({extended: true}));
  app.use(
    cors({
      origin: isProduction() ? config.cors.allowedHostsInProduction : true,
      credentials: true,
    })
  );

  app.use('/graphql', authenticate, graphql());
  app.get('/logs/:date', authenticate, validateRecordsRequest, discountRecords);

  app.get('/', hello);
  app.get('/version', version);

  app.post('/login', login);

  app.listen(config.server.port);
}

export default startServer;
