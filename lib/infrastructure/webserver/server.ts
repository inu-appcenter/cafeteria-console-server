import cors from 'cors';
import visit from './routes/visit';
import hello from './routes/hello';
import login from './routes/login';
import config from '../../../config';
import graphQL from './routes/graphQL';
import version from './routes/version';
import checkin from './routes/checkin';
import express from 'express';
import getContext from './routes/getContext';
import {authorizer} from './libs/middlewares/authorizer';
import cookieParser from 'cookie-parser';
import visitRecords from './routes/visitRecords';
import {isProduction} from '../../common/utils/nodeEnv';
import {errorHandler} from './libs/middlewares/errorHandler';
import discountRecords from './routes/discountRecords';

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
  app.use(visit);
  app.use(checkin);
  app.use(version);
  app.use(getContext);

  app.use(visitRecords);
  app.use(discountRecords);

  app.use('/graphql', authorizer, graphQL());

  app.use(errorHandler);

  app.listen(config.server.port);
}

export default startServer;
