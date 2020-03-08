import * as Koa from 'koa';

export interface Ilogger {
  scope: string;
  message: string;
}

const ctxReturn = (
  ctx: Koa.BaseContext,
  result: boolean,
  payload: object | string,
  message: string,
  status: number,
  log?: Ilogger,
): void => {
  // Logging
  if (log) {
    if (result) console.log(log.message);
    else console.error(log.message);
  }

  // Set Koa body
  ctx.body = {
    result,
    payload,
    message,
  };
  ctx.status = status;

  return;
};

export default ctxReturn;
