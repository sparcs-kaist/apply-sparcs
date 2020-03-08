import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as cors from '@koa/cors';

import './lib/env';

import api from './api';

// Set up Koa.js
const app = new Koa();
app.use(bodyparser());
app.use(
  cors({
    origin: process.env.HOST_DOMAIN,
    credentials: true,
  }),
);
app.use(api.routes()).use(api.allowedMethods());
console.log('Successfully set up koa.');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}.`);
});
