const Joi = require('joi');
const InvariantError = require('../exceptions/InvariantError');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const AuthValidator = {
  validateLoginPayload: (payload) => {
    const { error } = schema.validate(payload);
    if (error) throw new InvariantError(error.message);
  }
};
module.exports = AuthValidator;