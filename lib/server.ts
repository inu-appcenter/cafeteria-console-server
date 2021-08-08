import cors from 'cors';
import hello from './routes/hello';
import login from './routes/login';
import config from '../config';
import version from './routes/version';
import express from 'express';
import graphQL from './routes/graphQL';
import cookieParser from 'cookie-parser';
import authenticate from './routes/middlewares/authenticate';
import {isProduction} from './utils/nodeEnv';
import discountRecords from './routes/discountRecords';
import validateRecordsRequest from './routes/middlewares/validateRecordsRequest';

function startServer() {
  const app: express.Application = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(
    cors({
      origin: isProduction() ? config.cors.allowedHostsInProduction : true,
      credentials: true,
    })
  );

  app.use('/graphql', authenticate, graphQL());
  app.get('/records/:date', authenticate, validateRecordsRequest, discountRecords);

  app.get('/', hello);
  app.get('/version', version);

  app.post('/login', login);

  app.listen(config.server.port);
}

export default startServer;
