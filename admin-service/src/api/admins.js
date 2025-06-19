const AuthorizationError = require('../exceptions/AuthorizationError');

const adminPlugin = {
  name: 'admins',
  register: async (server, { service, validator }) => {
    const adminService = new service();
    const validate = validator.validatePayload;

    server.route([
      {
        method: 'POST',
        path: '/admins',
        handler: async (req, h) => {
          const { id: userId, role } = req.auth.credentials;
          if (role !== 'admin') throw new AuthorizationError();
          validate(req.payload);
          const adminId = await adminService.createAdmin({ user_id: req.payload.user_id, nama_lengkap: req.payload.nama_lengkap, no_hp: req.payload.no_hp, photo: req.payload.photo });
          return h.response({ status: 'success', data: { adminId } }).code(201);
        }
      },
      {
        method: 'GET',
        path: '/admins/me',
        handler: async (req, h) => {
          const { id: userId } = req.auth.credentials;
          const admin = await adminService.getAdminByUserId(userId);
          return h.response({ status: 'success', data: { admin } }).code(200);
        }
      },
      {
        method: 'PUT',
        path: '/admins/me',
        handler: async (req, h) => {
          const { id: userId, role } = req.auth.credentials;
          if (role !== 'admin') throw new AuthorizationError();
          validate(req.payload);
          await adminService.updateAdminByUserId(userId, req.payload);
          return h.response({ status: 'success' }).code(200);
        }
      },
      {
        method: 'DELETE',
        path: '/admins/me',
        handler: async (req, h) => {
          const { id: userId, role } = req.auth.credentials;
          if (role !== 'admin') throw new AuthorizationError();
          await adminService.deleteAdminByUserId(userId);
          return h.response({ status: 'success' }).code(200);
        }
      }
    ]);
  }
};

module.exports = adminPlugin;
