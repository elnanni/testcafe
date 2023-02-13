const cucumber = require('cucumber');
const navigation = require('../support/pages/navigation.js');
const home = require('../support/pages/home.js');

const http = require('http');

var filterDeviceTypeCmb = null
var deviceTypesList = []
var types = []
 
cucumber.When('I open device type combo box', async function () {
    filterDeviceTypeCmb = await testController.click(home.elements.filterDeviceTypeCmb());
    deviceTypesList = home.elements.deviceTypeList();
    await testController.expect(deviceTypesList.exists).ok();
});

cucumber.Then('I get all the different types of devices', async function () {
    var deviceTypesCount = await deviceTypesList.count;
    await testController.expect(deviceTypesCount).gt(1);
    for(let i = 0; i < deviceTypesCount; i++) {
        const elementSelector = deviceTypesList.nth(i);
        types.push(await elementSelector().innerText);
    }
});

cucumber.Then('I validate API from {string} device types matches with UI device types', async function (apiEndPoint) {
    var apiTypesList = await fetch(apiEndPoint)
      .then((response) => response.json())
      .then((data) => {
        list = [];
        list.push("ALL");
        data.map(function(type) {
          list.push(`${type.type}`);
        });
        return list;
      })
    await testController.expect(deviceTypesList.count).eql(apiTypesList.length);
    for(let i = 0; i < apiTypesList.length; i++) {
        await testController.expect(deviceTypesList.nth(i).innerText).eql(apiTypesList[i]);
    }
});
