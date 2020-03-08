import * as jwt from '../lib/jwt';
import ctxReturn from '../utils/ctx.return';

const checkAuthenticated = async (
  ctx: any,
  next: () => Promise<any>,
): Promise<any> => {
  try {
    const token = ctx.get('Authorization');

    // If there is no token
    if (!token) {
      return ctxReturn(ctx, false, null, 'invalid token', 400);
    }

    // Get user information by token
    const jwtValidateResult = jwt.validateJWT(token);

    // If there is no user
    if (!jwtValidateResult) {
      console.error(`Invalid token: ${jwtValidateResult}`);
      return ctxReturn(ctx, false, null, 'invalid token', 400);
    }

    // Pass
    // logger('auth').success(`JWT Validated: ${tokenUser.email} | ${token}`);
    ctx.state.user = {
      email: jwtValidateResult.email,
      stdNo: jwtValidateResult.stdNo,
    };
    ctx.state.token = token;
    return next();
  } catch (e) {
    // logger('auth').error(`Error while validating jwt: ${e}`);
    ctx.body = {
      result: false,
      payload: null,
      message: 'validate error',
    };
    ctx.state.user = null;
    ctx.status = 400;
    return;
  }
};

export default checkAuthenticated;
