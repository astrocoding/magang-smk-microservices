const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const ClientError = require('../exceptions/ClientError');

class AdminService {
  constructor() {
    this._pool = new Pool();
  }

  async createAdmin({ user_id, nama_lengkap, no_hp, photo }) {
    const id = uuidv4();
    const now = new Date();
    const query = {
      text: `INSERT INTO admins (id, user_id, nama_lengkap, no_hp, photo, created_at, updated_at)
            VALUES ($1,$2,$3,$4,$5,$6,$6) RETURNING id`,
      values: [id, user_id, nama_lengkap, no_hp, photo, now]
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new ClientError('Admin creation failed');
    return result.rows[0].id;
  }

  async getAdminByUserId(userId) {
    const query = {
      text: `SELECT id, user_id, nama_lengkap, no_hp, photo, created_at, updated_at
            FROM admins WHERE user_id = $1`,
      values: [userId]
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new ClientError('Admin not found', 404);
    return result.rows[0];
  }

  async updateAdminByUserId(userId, { nama_lengkap, no_hp, photo }) {
    const now = new Date();
    const query = {
      text: `UPDATE admins
            SET nama_lengkap = $1,
                no_hp        = $2,
                photo        = $3,
                updated_at   = $4
            WHERE user_id = $5 RETURNING id`,
      values: [nama_lengkap, no_hp, photo, now, userId]
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new ClientError('Admin update failed', 400);
    return result.rows[0].id;
  }

  async deleteAdminByUserId(userId) {
    const query = {
      text: `DELETE FROM admins
            WHERE user_id = $1 RETURNING id`,
      values: [userId]
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new ClientError('Admin deletion failed', 400);
    return result.rows[0].id;
  }
}

module.exports = AdminService;