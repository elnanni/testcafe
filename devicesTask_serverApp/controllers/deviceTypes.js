const shortid = require('shortid')
const deviceTypes = require('../deviceTypes.json')

exports.getDeviceTypes = (req, res) => {
  res.json(deviceTypes)
}

exports.addDeviceType = (req, res) => {
  const { type } = req.body
  const newDeviceType = {
    id: shortid.generate(),
    type: type
  }
  deviceTypes.push(newDeviceType)
  res.json(newDeviceType)
}

exports.getDeviceType = (req, res) => {
  const { id } = req.params
  const deviceType = deviceTypes.find(d => d.id === id)
  res.json(deviceType)
}

exports.updateDeviceType = (req, res) => {
  const { id } = req.params
  const { type } = req.body
  let updated = false
  devices.forEach(deviceType => {
    if(device.id === id) {
      deviceType.type = type
      updated = true
    }
  })
  res.json(updated ? 1 : 0)
}

exports.deleteDeviceType = (req, res) => {
  const { id } = req.params
  let deleted = false
  devices.forEach((device, i) => {
    if(device.id === id) {
      deviceTypes.splice(i, 1)
      deleted = true
    }
  })
  res.json(deleted ? 1 : 0)
}