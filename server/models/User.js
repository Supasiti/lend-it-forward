const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Must use a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  // set this to use virtual below
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

// Duplicate the ID field.
userSchema.virtual('id').get(() => this._id);

const User = model('User', userSchema);

module.exports = User;
