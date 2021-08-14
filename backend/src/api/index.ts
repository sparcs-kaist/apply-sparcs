import * as Koa from 'koa';
import * as Router from 'koa-router';

import auth from './auth';
import apply from './apply';
import forms from './forms';

// Set up api route
const api = new Router();
api.get('/', (ctx: Koa.BaseContext) => {
  ctx.body = 'apply.sparcs';
});

api.use('/auth', auth.routes());
api.use('/apply', apply.routes());
api.use('/forms', forms.routes());

export default api;
