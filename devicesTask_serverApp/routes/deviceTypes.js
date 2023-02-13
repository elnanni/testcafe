const { getDeviceTypes, addDeviceType, getDeviceType, updateDeviceType, deleteDeviceType } = require('../controllers/deviceTypes')

module.exports = app => {
  app.route('/deviceTypes')
    .get(getDeviceTypes)
    .post(addDeviceType)

  app.route('/deviceTypes/:id')
    .get(getDeviceType)
    .put(updateDeviceType)
    .delete(deleteDeviceType)
}