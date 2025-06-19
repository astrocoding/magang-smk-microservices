require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const ClientError = require('./exceptions/ClientError');
const adminPlugin = require('./api/admins');
const AdminService = require('./services/AdminService');
const AdminValidator = require('./validator/AdminValidator');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: { cors: { origin: ['*'] } }
  });

  await server.register(Jwt);
  server.auth.strategy('jwt_admin', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: { aud: false, iss: false, sub: false, maxAgeSec: process.env.ACCESS_TOKEN_AGE },
    validate: (artifacts) => ({
      isValid: true,
      credentials: artifacts.decoded.payload
    })
  });
  server.auth.default('jwt_admin');

  await server.register({
    plugin: adminPlugin,
    options: { service: AdminService, validator: AdminValidator }
  });

  server.ext('onPreResponse', (req, h) => {
    const { response } = req;
    if (response instanceof ClientError) {
      return h.response({ status: 'fail', message: response.message }).code(response.statusCode);
    }
    if (response.isServer) {
      return h.response({ status: 'error', message: 'Internal server error' }).code(500);
    }
    return h.continue;
  });

  await server.start();
  console.log(`Admin Service running at ${server.info.uri}`);
};
init();