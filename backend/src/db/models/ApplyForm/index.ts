import * as mongoose from 'mongoose';
import ApplyForm from './ApplyForm';

export interface IApplyFormDocument extends mongoose.Document {
  name: string;
  stdNo: number;
  dept: string;
  phone: string;
  applyType: 'developer' | 'designer' | 'planner';

  introduction: string;
  workToDo: string;
  motivation: string;
  meetup: boolean;
  activeForFour: boolean;
}

export interface IApplyForm extends IApplyFormDocument {
  // Methods
}

export interface IApplyFormModel extends mongoose.Model<IApplyForm> {
  // Statics
}

export default mongoose.model<IApplyForm, IApplyFormModel>(
  'ApplyForm',
  ApplyForm,
);
