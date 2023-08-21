import * as Router from 'koa-router';
import * as joi from '@hapi/joi';
import ctxReturn from '../utils/ctx.return';
import ApplyForm from '../db/models/ApplyForm';
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
      .valid('developer', 'designer', 'planner')
      .required(),

    introduction: joi.string(),
    workToDo: joi.string(),
    motivation: joi.string(),
    meetup: joi.boolean().required(),
    activeForFour: joi.boolean().required(),
  });
  const joiValidateResult = joiObject.validate(data);
  if (joiValidateResult.error) {
    console.error(`Validation error: ${joiValidateResult.error.message}`);
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  // Check is same user
  if (
    ctx.state.user.email !== email ||
    ctx.state.user.stdNo !== stdNo.toString()
  ) {
    console.error(
      `User not match. ${JSON.stringify(ctx.state.user)}, ${email}, ${stdNo}`,
    );
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  // Check duplicatedForm
  let checkDuplicate = await ApplyForm.findOne({ email, stdNo });
  if (checkDuplicate) {
    return ctxReturn(ctx, false, null, 'already exists', 409);
  }

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
  const { stdNo, email } = ctx.request.query;

  // Validate input
  const joiObject = joi.object({
    email: joi.string().required(),
    stdNo: joi.number().required(),
  });
  const joiValidateResult = joiObject.validate({ stdNo, email });
  if (joiValidateResult.error) {
    console.error(`Validation error: ${joiValidateResult.error.message}`);
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  // Check is same user
  if (
    ctx.state.user.email !== email ||
    ctx.state.user.stdNo !== stdNo.toString()
  ) {
    console.error(
      `User not match. ${JSON.stringify(ctx.state.user)}, ${email}, ${stdNo}`,
    );
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  let applyForm = await ApplyForm.findOne({ email, stdNo });
  if (!applyForm) {
    return ctxReturn(ctx, false, null, 'not found', 404);
  }

  return ctxReturn(ctx, true, applyForm, '', 200);
};

const editApply = async (ctx: any): Promise<void> => {
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
    `Processing edit apply from data: ${data.email}, ${data.name}, ${data.stdNo}`,
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
      .valid('developer', 'designer', 'planner')
      .required(),

    introduction: joi.string(),
    workToDo: joi.string(),
    motivation: joi.string(),
    meetup: joi.boolean().required(),
    activeForFour: joi.boolean().required(),
  });
  const joiValidateResult = joiObject.validate(data);
  if (joiValidateResult.error) {
    console.error(`Validation error: ${joiValidateResult.error.message}`);
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  // Check is same user
  if (
    ctx.state.user.email !== email ||
    ctx.state.user.stdNo !== stdNo.toString()
  ) {
    console.error(
      `User not match. ${JSON.stringify(ctx.state.user)}, ${email}, ${stdNo}`,
    );
    return ctxReturn(ctx, false, null, 'bad request', 400);
  }

  const applyForm = await ApplyForm.findOneAndUpdate(
    { email, stdNo },
    {
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
    },
    { upsert: true, new: true },
  );
  if (!applyForm) {
    return ctxReturn(ctx, false, null, 'not found', 404);
  }

  console.log(`Form updated: ${email}, ${stdNo}`);
  return ctxReturn(ctx, true, applyForm, '', 200);
};

apply.use(checkAuthenticated);
apply.post('/', newApply);
apply.put('/', editApply);
apply.get('/', getApply);

export default apply;
