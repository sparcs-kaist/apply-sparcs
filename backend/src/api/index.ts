import * as Koa from 'koa';
import * as Router from 'koa-router';

import auth from './auth';
import apply from './apply';

// Set up api route
const api = new Router();
api.get('/', (ctx: Koa.BaseContext) => {
  ctx.body = 'apply.sparcs';
});

api.use('/auth', auth.routes());
api.use('/apply', apply.routes());

export default api;
