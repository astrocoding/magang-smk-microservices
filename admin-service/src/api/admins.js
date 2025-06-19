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
          const { role, id: credId } = req.auth.credentials;
          if (role !== 'admin') throw require('../exceptions/AuthorizationError')();
          validate(req.payload);
          const id = await adminService.createAdmin(req.payload);
          return h.response({ status: 'success', data: { adminId: id } }).code(201);
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
      }
    ]);
  }
};
module.exports = adminPlugin;