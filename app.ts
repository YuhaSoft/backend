const params = require('strong-params');
import bodyParser, { json } from 'body-parser';
import { NOT_FOUND_STATUS_CODE, NOT_FOUND_STATUS_MESSAGE } from './src/config/constants';
import { Logger } from './lib/logger';
import { middlewares } from './src/middlewares/error.handler';
import { routes as apiRoutes } from './src/routes/index';
import express, { NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const logger = new Logger();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(json({ limit: '2mb', type: 'application/json' }));

const corsOptions: CorsOptions = {
  origin: ['https://yuhasoft.github.io'], // GitHub Pages URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(params.expressMiddleware());
app.use(logger.getRequestLogger());

app.use('/api', apiRoutes);

app.use('/api', createProxyMiddleware({
  target: 'http://reboost.eu-4.evennode.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
  secure: false,
}));

app.get('/health', (req: Request, res: Response) => res.json({ status: true, message: 'Health OK!' }));

app.use(logger.getRequestErrorLogger());

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error(NOT_FOUND_STATUS_MESSAGE);
  res.statusCode = NOT_FOUND_STATUS_CODE;
  res.send(err.message);
});
app.use(middlewares.handleRequestError);

export { app };
