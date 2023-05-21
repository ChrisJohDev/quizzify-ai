/**
 * Mongoose model Users.
 *
 * @author Chris Johannesson
 * @version 0.0.1
 */

import mongoose from 'mongoose'

/**
 * The user schema.
 *
 * @type {mongoose.Schema}
 * @param {string} username - The username.
 * @param {string} firstName - The first name.
 * @param {string} lastName - The last name.
 * @param {string} email - The email.
 * @param {string} salt - The salt.
 * @param {string} hashedPassword - The hashed password.
 */

const userSchema = new mongoose.Schema({
  guid: {
    required: true,
    type: String,
    unique: true
  },
  username: {
    required: true,
    unique: false,
    type: String,
    validate: {
      /**
       * Validates that the username is valid.
       *
       * @param {string} v - The value to validate.
       * @returns {boolean} - True if the value is valid, otherwise false.
       */
      validator: function (v) {
        return /^[A-Za-z][A-Za-z0-9_-]{2,255}$/.test(v)
      }
    },
    minLength: 3,
    maxLength: 256,
    unique: false
  },
  firstName: {
    required: true,
    type: String,
    minLength: 3,
    maxLength: 100,
    unique: false
  },
  lastName: {
    required: true,
    type: String,
    minLength: 3,
    maxLength: 100,
    unique: false
  },
  email: {
    required: true,
    type: String,
    validate: {
      /**
       * Validates that the email is valid.
       *
       * @param {string} v - The value to validate.
       * @returns {boolean} - True if the value is valid, otherwise false.
       */
      validator: function (v) {
        return /^[a-zA-Z0-9][^\s@]+@([^\s@]+\.)+[a-zA-Z]{2,}$/.test(v)
      },
      /**
       * The error message to display if the validation fails.
       *
       * @param {string} props - The properties of the validator.
       * @returns {string} - The error message.
       */
      message: props => `${props.valueOf} is not a valid email!`
    },
    unique: false
  },
  salt: {
    required: true,
    type: String,
    minLength: 8,
    maxLength: 100,
    unique: true
  },
  hashedPassword: {
    required: true,
    type: String,
    minLength: 10,
    maxLength: 256
  },
  isVerified: {
    required: true,
    type: Boolean,
    default: false
  },
  verificationToken: {
    required: true,
    type: String
  },
  verificationTokenExpires: {
    required: true,
    type: Number
  },
  resetPasswordToken: {
    required: false,
    type: String
  }
}, {
  timestamps: true,
  toObject: {
    virtual: true, // ensure virtual fields are serialized
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    }
  }
})

export default mongoose.models.User || mongoose.model('User', userSchema);

/**
 * A virtual property is a property that is not persisted to the database, but can be computed
 * from other fields in the document. In this case, the id virtual property is computed from
 * the _id field of the document.
 */
