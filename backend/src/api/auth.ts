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
  const { code, state } = ctx.request.body;

  const isStateValid = (await stateValidator(encryptedState, state)) || false;
  console.log(`state validation: ${state}, ${encryptedState}, ${isStateValid}`);

  if (!isStateValid) {
    return ctxReturn(ctx, false, null, '', 401);
  }

  // Get user information from SSO
  const sparcsInfo = await SSOClient.getUserInfo(code);
  const kaistInfo = JSON.parse(sparcsInfo.kaist_info);

  ctx.cookies.set('SESSID', '', {
    maxAge: 1000 * 60 * 10,
    overwrite: true,
  });

  return ctxReturn(
    ctx,
    true,
    {
      isStateValid: true,
      ku_kname: kaistInfo.ku_kname,
      ku_std_no: kaistInfo.ku_std_no,
      mail: kaistInfo.mail,
    },
    '',
    200,
  );
};

// auth.get('/', checkAuth);
auth.post('/login', login);
auth.post('/login/callback', loginCallback);
// auth.get('/logout', logout);

export default auth;
