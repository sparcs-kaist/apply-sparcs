import ApplyForm from '../db/models/ApplyForm';
import * as Router from 'koa-router';
import ctxReturn from '../utils/ctx.return';

const forms: Router = new Router();

const getAllApplies = async (ctx: any): Promise<void> => {
    const { password } = ctx.request.query;
    if(password === process.env.DB_PASSWORD){
        let applyForms = await ApplyForm.find({});
        console.log('Apply forms accessed');
        return ctxReturn(ctx, true, applyForms, '', 200);
    }
    return ctxReturn(ctx, false, null, 'bad request', 400);
};

forms.get('/', getAllApplies);

export default forms;
