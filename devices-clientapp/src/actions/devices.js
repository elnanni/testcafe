import { fetcher } from '../methods';
import {  sort } from '../methods'
const server = "http://localhost:3000";

export const DEVICES = (dispatch) => ({
  getDeviceTypes: async() => {
    var deviceTypes = await fetcher(server + "/deviceTypes", "GET")
    console.log(deviceTypes)
    if (deviceTypes) {
      dispatch({ type: "GET_DEVICETYPES", deviceTypes })
    }
  },
  getDevices: async () => {
    var devices = await fetcher(server + "/devices", "GET")
    console.log(devices)
    if (devices) {
      devices = sort(devices, "hdd_capacity")
      dispatch({ type: "GET_DEVICES", devices })
    }
  },
  getDevice: async (id, callback) => {
    const device = await fetcher(server + "/devices/" + id, "GET")
    if (device) { 
      dispatch({ type: "GET_DEVICE", device })
      callback()
    }
  },
  addDevice: async (new_device) => {
    const device = await fetcher(server + "/devices", "POST", new_device)
    if (device) {
      dispatch({ type: "ADD_DEVICE", device })
    }
  },
  removeDevice: async (device) => {
    const response = await fetcher(server + "/devices/" + device.id, "DELETE")
    if (response === 1) {
      dispatch({ type: "REMOVE_DEVICE", device })
    }
  },
  updateDevice: async (device) => {
    const response = await fetcher(server + "/devices/" + device.id, "PUT", device)
    if (response === 1) {
      dispatch({ type: "UPDATE_DEVICES", device })
    }
  },
  filterValue: (value) => { 
    dispatch({ type: "FILTER_TYPE", value })
  },
  sortList: (dev, key) => {
    const devices = sort(dev, key)
    dispatch({ type: "SORT_BY", devices })
  },
});

