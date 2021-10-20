const { Schema, model } = require('mongoose');

const loanSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Must have a title'],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    holder: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reservedFor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  // set this to use virtual below
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

// Duplicate the ID field.
loanSchema.virtual('id').get(() => this._id);

const Loan = model('Loan', loanSchema);

module.exports = Loan;
