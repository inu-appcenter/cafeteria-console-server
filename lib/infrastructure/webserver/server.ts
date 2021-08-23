import cors from 'cors';
import hello from './routes/hello';
import login from './routes/login';
import config from '../../../config';
import version from './routes/version';
import express from 'express';
import graphQL from './routes/graphQL';
import cookieParser from 'cookie-parser';
import {isProduction} from '../../common/utils/nodeEnv';
import records from './routes/records';
import {authorizer} from './libs/middlewares/authorizer';
import checkin from './routes/checkin';
import getContext from './routes/getContext';
import {errorHandler} from './libs/middlewares/errorHandler';

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

  app.use(hello);
  app.use(login);
  app.use(version);
  app.use(records);
  app.use(checkin);
  app.use(getContext);

  app.use('/graphql', authorizer, graphQL());

  app.use(errorHandler);

  app.listen(config.server.port);
}

export default startServer;
