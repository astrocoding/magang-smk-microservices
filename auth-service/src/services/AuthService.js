const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const AuthenticationError = require('../exceptions/AuthenticationError');

class AuthService {
  constructor() {
    this._pool = new Pool();
  }
  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password, role FROM users WHERE email = $1',
      values: [email]
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) throw new AuthenticationError('Invalid credentials');
    const { id, password: hashed, role } = result.rows[0];
    const match = await bcrypt.compare(password, hashed);
    if (!match) throw new AuthenticationError('Invalid credentials');
    return { id, role };
  }
}
module.exports = AuthService;