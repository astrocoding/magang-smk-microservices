const Joi = require('joi');
const InvariantError = require('../exceptions/InvariantError');

const schema = Joi.object({
  user_id: Joi.string().guid({ version: 'uuidv4' }).required(),
  nama_lengkap: Joi.string().max(100).required(),
  no_hp: Joi.string().pattern(/^[0-9()+-]+$/).required(),
  photo: Joi.string().uri().allow('', null)
});

class AdminValidator {
  static validatePayload(payload) {
    const { error } = schema.validate(payload);
    if (error) throw new InvariantError(error.message);
  }
}
module.exports = AdminValidator;