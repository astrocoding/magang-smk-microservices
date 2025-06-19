exports.shorthands = undefined;
exports.up = pgm => {
  pgm.createTable('admins', {
    id: { type: 'uuid', primaryKey: true, notNull: true, default: pgm.func('uuid_generate_v4()') },
    user_id: { type: 'uuid', notNull: true },
    nama_lengkap: { type: 'varchar(100)', notNull: true },
    no_hp: { type: 'varchar(20)', notNull: true },
    photo: { type: 'text' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
  });
  // pgm.addConstraint('admins', 'fk_admin_user', { foreignKeys: [{ columns: 'user_id', references: 'users(id)', onDelete: 'cascade' }] });
};
exports.down = pgm => {
  pgm.dropTable('admins');
};