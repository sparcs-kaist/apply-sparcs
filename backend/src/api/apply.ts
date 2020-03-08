import * as Router from 'koa-router';
import * as joi from '@hapi/joi';
import ctxReturn from '../utils/ctx.return';
import ApplyForm from '../db/models/ApplyForm';
import { stateEncryptor, stateValidator } from 'src/utils/state.utils';
import checkAuthenticated from '../middlewares/middleware.authenticate';

const apply: Router = new Router();

const newApply = async (ctx: any): Promise<void> => {
  const data = ctx.request.body;
  const {
    name,
    stdNo,
    email,
    dept,
    phone,
    applyType,
    introduction,
    workToDo,
    motivation,
    meetup,
    activeForFour,
    password,
  } = data;

  console.log(
    `Processing new apply from data: ${data.email}, ${data.name}, ${data.stdNo}`,
  );

  // Validate input
  const joiObject = joi.object({
    name: joi.string().required(),
    stdNo: joi
      .number()
      .integer()
      .required(),
    email: joi
      .string()
      .email()
      .required(),
    dept: joi.string().required(),
    phone: joi.string().required(),
    applyType: joi
      .string()
      .valid('developer', 'designer')
      .required(),

    introduction: joi.string(),
    workToDo: joi.string(),
    motivation: joi.string(),
    meetup: joi.boolean().required(),
    activeForFour: joi.boolean().required(),

    password: joi.string().required(),
  });
  const joiValidateResult = joiObject.validate(data);
  if (joiValidateResult.error) {
    console.error(`Validation error: ${joiValidateResult.error.message}`);
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  const hashedPassword = await stateEncryptor(password);

  // Creating new apply form
  const applyFormDocument = new ApplyForm({
    name,
    stdNo,
    email,
    dept,
    phone,
    applyType,
    introduction,
    workToDo,
    motivation,
    meetup,
    activeForFour,
    password: hashedPassword,
  });

  const applyFormId = await ApplyForm.create(applyFormDocument)
    .then(applyForm => {
      return applyForm.id;
    })
    .catch(err => {
      console.error(err);
      return ctxReturn(ctx, false, null, '', 500);
    });

  console.log(`New apply form submitted: ${applyFormId}`);
  return ctxReturn(ctx, true, { id: applyFormId }, null, 200);
};

const getApply = async (ctx: any): Promise<void> => {
  const data = ctx.request.body;
  const { stdNo, email, password } = data;

  // Validate input
  const joiObject = joi.object({
    email: joi.string().required(),
    stdNo: joi.number().required(),
    password: joi.string().required(),
  });
  const joiValidateResult = joiObject.validate(data);
  if (joiValidateResult.error) {
    console.error(`Validation error: ${joiValidateResult.error.message}`);
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  let applyForm = await ApplyForm.findOne({ email, stdNo });
  if (!applyForm) {
    return ctxReturn(ctx, false, null, 'not found', 404);
  }
  
  const isOwner = await stateValidator(applyForm.password, password);
  if (!isOwner) {
    console.error(`Invalid password: ${email}, ${stdNo}`);
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  applyForm.password = undefined;
  return ctxReturn(ctx, true, applyForm, '', 200);
};

apply.use(checkAuthenticated);
apply.post('/', newApply);
apply.get('/', getApply);

export default apply;
