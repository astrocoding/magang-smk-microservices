require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const ClientError = require('./exceptions/ClientError');
const authPlugin = require('./api/auth');
const AuthService = require('./services/AuthService');
const AuthValidator = require('./validator/AuthValidator');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: { cors: { origin: ['*'] } }
  });

  await server.register(Jwt);
  server.auth.strategy('jwt_auth', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: { aud: false, iss: false, sub: false, maxAgeSec: process.env.ACCESS_TOKEN_AGE },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        role: artifacts.decoded.payload.role
      }
    })
  });

  await server.register({
    plugin: authPlugin,
    options: { service: AuthService, validator: AuthValidator }
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof ClientError) {
      return h.response({ status: 'fail', message: response.message }).code(response.statusCode);
    }
    if (response.isServer) {
      return h.response({ status: 'error', message: 'Internal server error' }).code(500);
    }
    return h.continue;
  });

  await server.start();
  console.log(`Auth Service running at ${server.info.uri}`);
};
init();
