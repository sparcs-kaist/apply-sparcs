import * as Router from 'koa-router';
import SSOClient from '../utils/sso';
import { stateEncryptor, stateValidator } from '../utils/state.utils';
import ctxReturn from 'src/utils/ctx.return';

const auth: Router = new Router();

const login = async (ctx: any): Promise<void> => {
  const { url, state } = SSOClient.getLoginParams();
  const encryptedState = (await stateEncryptor(state)) || 'err_empty_state';

  console.log(
    `get /auth/login request... url: ${url}, state: ${state}, encrypted: ${encryptedState}`,
  );

  ctx.cookies.set('SESSID', encryptedState, {
    maxAge: 1000 * 60 * 10,
    overwrite: true,
  });
  return ctxReturn(ctx, true, { url }, '', 200);
};

const loginCallback = async (ctx: any): Promise<void> => {
  const encryptedState = ctx.cookies.get('SESSID') || 'err_empty_state';
  const { state } = ctx.request.body;

  const isStateValid = await stateValidator(encryptedState, state) || false;
  console.log(`state validation: ${state}, ${encryptedState}, ${isStateValid}`);

  ctx.cookies.set('SESSID', '', {
    maxAge: 1000 * 60 * 10,
    overwrite: true,
  });

  return ctxReturn(ctx, isStateValid, null, '', 200);
};

// auth.get('/', checkAuth);
auth.post('/login', login);
auth.post('/login/callback', loginCallback);
// auth.get('/logout', logout);

export default auth;
