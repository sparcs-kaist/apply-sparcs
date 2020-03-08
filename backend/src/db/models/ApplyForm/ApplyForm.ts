import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const ApplyForm = new Schema({
  name: { type: String, required: true },
  stdNo: { type: Number, required: true },
  email: { type: String, required: true },
  dept: { type: String, required: true },
  phone: { type: String, required: true },
  applyType: { type: String, required: true },

  introduction: { type: String },
  workToDo: { type: String },
  motivation: { type: String },
  meetup: { type: Boolean, required: true },
  activeForFour: { type: Boolean, required: true },
});

export default ApplyForm;
