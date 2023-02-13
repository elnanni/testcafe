const {Selector} = require('testcafe');

exports.elements = {
    addDeviceForm: function() {
        return Selector('.device-form').with({ boundTestRun: testController });
    },
    inputSystemName: function() {
        return Selector('#system_name').with({ boundTestRun: testController });
    },
    selectType: function() {
        return Selector('#type').with({ boundTestRun: testController });
    },
    optionType: function() {
        return this.selectType().find('option').with({ boundTestRun: testController });
    },
    inputHddCapacity: function() {
        return Selector('#hdd_capacity').with({ boundTestRun: testController });
    },
    buttonSubmit: function() {
        return Selector('.submitButton').with({ boundTestRun: testController });
    }
}
