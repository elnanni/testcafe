const {Selector} = require('testcafe');

exports.elements = {
    filterDeviceTypeCmb: function() {
        return Selector('#device_type').with({ boundTestRun: testController });
    },
    deviceTypeList: function() {
        return this.filterDeviceTypeCmb().child().with({ boundTestRun: testController });
    },
    sortCapacity: function() {
        return Selector('#sort_by').with({ boundTestRun: testController });
    },
    addDeviceButton: function() {
        return Selector('.submitButton').with({ boundTestRun: testController });
    },
    listOfDevicesBox: function() {
        return Selector('.list-devices').with({ boundTestRun: testController });
    },
    devices: function(id = "") {
        return Selector("div[class *= 'device-main-box-" + id + "']").with({ boundTestRun: testController });
    },
    deviceInfo: function(id) {
        return this.devices(id).child('.device-info').with({ boundTestRun: testController });
    },
    deviceName: function(id) {
        return this.deviceInfo(id).child('.device-name').with({ boundTestRun: testController });
    },
    deviceType: function(id) {
        return this.deviceInfo(id).child('.device-type').with({ boundTestRun: testController });
    },
    deviceHdd: function(id) {
        return this.deviceInfo(id).child('.device-capacity').with({ boundTestRun: testController });
    },
    deviceOptions: function(id) {
        return this.devices(id).child('.device-options').with({ boundTestRun: testController });
    },
    deviceEdit: function(id) {
        return this.deviceOptions(id).child('.device-edit').with({ boundTestRun: testController });
    },
    deviceDelete: function(id) {
        return this.deviceOptions(id).child('.device-remove').with({ boundTestRun: testController });
    }
}