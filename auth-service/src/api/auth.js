const AuthValidator = require('../validator/AuthValidator');
const AuthService = require('../services/AuthService');
const TokenManager = require('../tokenize/TokenManager');

exports.plugin = {
  name: 'auth',
  register: async (server, { service, validator }) => {
    const authService = new service();
    server.route({
      method: 'POST',
      path: '/auth/login',
      handler: async (req, h) => {
        validator.validateLoginPayload(req.payload);
        const { id, role } = await authService.verifyUserCredential(req.payload.email, req.payload.password);
        const accessToken = TokenManager.generateAccessToken({ id, role });
        return h.response({ status: 'success', data: { accessToken } }).code(200);
      }
    });
  }
};
