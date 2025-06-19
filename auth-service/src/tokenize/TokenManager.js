const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

class TokenManager {
  static generateAccessToken(payload) {
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }
  static verifyAccessToken(token) {
    try {
      const artifacts = Jwt.token.decode(token);
      Jwt.token.verifySignature(artifacts, process.env.ACCESS_TOKEN_KEY);
      Jwt.token.verifyExpiration(artifacts);
      return artifacts.decoded.payload;
    } catch {
      throw new InvariantError('Invalid or expired token');
    }
  }
}
module.exports = TokenManager;