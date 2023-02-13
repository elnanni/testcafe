const shortid = require('shortid')
const devices = require('../devices.json')

exports.getDevices = (req, res) => {
  res.json(devices)
}

exports.addDevice = (req, res) => {
  const { system_name, type, hdd_capacity } = req.body
  const newDevice = {
    id: shortid.generate(),
    system_name,
    type,
    hdd_capacity
  }
  devices.push(newDevice)
  res.json(newDevice)
}

exports.getDevice = (req, res) => {
  const { id } = req.params
  const device = devices.find(d => d.id === id)
  res.json(device)
}

exports.updateDevice = (req, res) => {
  const { id } = req.params
  const { system_name, type, hdd_capacity } = req.body
  let updated = false
  devices.forEach(device => {
    if(device.id === id) {
      device.system_name = system_name
      device.type = type
      device.hdd_capacity = hdd_capacity
      updated = true
    }
  })
  res.json(updated ? 1 : 0)
}

exports.deleteDevice = (req, res) => {
  const { id } = req.params
  let deleted = false
  devices.forEach((device, i) => {
    if(device.id === id) {
      devices.splice(i, 1)
      deleted = true
    }
  })
  res.json(deleted ? 1 : 0)
}