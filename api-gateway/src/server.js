require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const H2o2 = require('@hapi/h2o2');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: { cors: { origin: ['*'] }, timeout: { server: 30000, socket: false } }
  });

  await server.register([Jwt, H2o2]);

  // JWT strategy: validate token for protected routes
  server.auth.strategy('gateway_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: { aud: false, iss: false, sub: false, maxAgeSec: process.env.ACCESS_TOKEN_AGE },
    validate: (artifacts) => ({
      isValid: true,
      credentials: artifacts.decoded.payload
    })
  });
  server.auth.default('gateway_jwt');

  // Proxy /auth/* routes - public
  server.route({
    method: ['GET','POST','PUT','DELETE'],
    path: '/auth/{param*}',
    options: { auth: false },
    handler: {
      proxy: {
        mapUri: (req) => ({
          uri: `${process.env.AUTH_SERVICE_URL}/auth${req.params.param ? '/' + req.params.param : ''}`,
          headers: req.headers
        }),
        passThrough: true,
        xforward: true
      }
    }
  });

  // Health check
  server.route({
    method: 'GET',
    path: '/health',
    options: { auth: false },
    handler: () => ({ status: 'ok', service: 'api-gateway' })
  });

  await server.start();
  console.log(`API Gateway running at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();