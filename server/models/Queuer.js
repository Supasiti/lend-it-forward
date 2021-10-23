const { Schema, model } = require('mongoose');

const queuerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    loan: {
      type: Schema.Types.ObjectId,
      ref: 'Loan',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    contact: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  // set this to use virtual below
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

// Duplicate the ID field.
queuerSchema.virtual('id').get(() => this._id);

const Queuer = model('Queuer', queuerSchema);

module.exports = Queuer;
