import * as mongoose from 'mongoose';
import lengthOkay from '../../../utils/length';
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
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

// eslint-disable-next-line func-names
ApplyForm.virtual('lengthOkay').get(function() {
  return lengthOkay(this.workToDo) && lengthOkay(this.introduction) && lengthOkay(this.motivation);
});

export default ApplyForm;
