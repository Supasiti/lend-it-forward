const { Schema, model } = require('mongoose');

const requestSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sentOn: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
    loan: {
      type: Schema.Types.ObjectId,
      ref: 'Loan',
    },
    subject: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    reason: {
      type: String,
      enum: ['borrow', 'return'],
      required: [true, 'Please state the purpose of this request'],
    },
  },
  // set this to use virtual below
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

// Duplicate the ID field.
requestSchema.virtual('id').get(() => this._id);

const Request = model('Request', requestSchema);

module.exports = Request;
