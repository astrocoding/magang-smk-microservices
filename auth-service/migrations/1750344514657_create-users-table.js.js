exports.shorthands = undefined;
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true, notNull: true, default: pgm.func('uuid_generate_v4()') },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password: { type: 'text', notNull: true },
    role: { type: 'varchar(20)', notNull: true, check: `role IN ('murid','guru','mentor','perusahaan','admin')` },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
  });
};
exports.down = (pgm) => {
  pgm.dropTable('users');
};