const cucumber = require('cucumber');
const addDevice = require('../support/pages/addDevice.js');
const home = require('../support/pages/home.js');

var device = {
    name: "",
    type: "",
    hdd: ""
}

var newDevice = null;

var deviceListUI = null;
var deviceListAPI = null;

cucumber.Given('I can navigate to devices web page {string}', async function (url) {
    await testController.navigateTo(url);
    filterDeviceTypeCmb = home.elements.filterDeviceTypeCmb();
    await testController.expect(filterDeviceTypeCmb.exists).ok();
});

cucumber.Given('I can navigate to add device web page {string}', async function (url) {
    await testController.navigateTo(url);
    addDeviceForm = addDevice.elements.addDeviceForm();
    await testController.expect(addDeviceForm.exists).ok();
});

cucumber.When('I get the list of devices from UI', async function () {
    this.deviceListUI = home.elements.devices();
});

cucumber.When('I get the list of devices from API {string}', async function (apiEndPoint) {
    this.deviceListAPI = await fetch(apiEndPoint)
    .then((response) => response.json())
    .then((data) => {
      list = [];
      list.push(data);
      return list;
    });
});

cucumber.Then('I validate both lists match and device contains edit and delete buttons', async function () {
    for (var device of this.deviceListAPI[0]){
        var devName = home.elements.deviceName(device.id);
        var devType = home.elements.deviceType(device.id);
        var devHdd = home.elements.deviceHdd(device.id);
        var editDevice = home.elements.deviceEdit(device.id);
        var deleteDevice = home.elements.deviceDelete(device.id);
        await testController.scroll(devName);
        await testController.expect(devName.visible).eql(true);
        await testController.expect(devName.innerText).eql(device.system_name);
        await testController.scroll(devType);
        await testController.expect(devType.visible).eql(true);
        await testController.expect(devType.innerText).eql(device.type);
        await testController.scroll(devHdd);
        await testController.expect(devHdd.visible).eql(true);
        await testController.expect(devHdd.innerText).eql(device.hdd_capacity + " GB");
        await testController.scroll(editDevice);
        await testController.expect(editDevice.visible).eql(true);
        await testController.expect(editDevice.innerText).eql("EDIT");
        await testController.scroll(deleteDevice);
        await testController.expect(deleteDevice.visible).eql(true);
        await testController.expect(deleteDevice.innerText).eql("REMOVE");
    }
});
 
cucumber.When('I create a new device with name {string} type {string} and hdd {string}', async function (name, type, hdd) {
    this.device = {name, type, hdd};
    inputSystemName = addDevice.elements.inputSystemName();
    selectType = addDevice.elements.selectType();
    optionType = addDevice.elements.optionType();
    inputHddCapacity = addDevice.elements.inputHddCapacity();
    buttonSubmit = addDevice.elements.buttonSubmit();
    await testController.typeText(inputSystemName, this.device.name);
    await testController.click(selectType).click(optionType.withText(this.device.type)).expect(selectType.value).eql(this.device.type);
    await testController.typeText(inputHddCapacity, this.device.hdd);
    await testController.click(buttonSubmit);
});

cucumber.Then('I validate new device {string} is created in API {string}', async function (deviceName, apiEndPoint) {
    this.newDevice = await fetch(apiEndPoint)
      .then((response) => response.json())
      .then((data) => data.filter(element =>  element.system_name == deviceName));
    await testController.expect(this.newDevice[0].system_name).eql(this.device.name);
    await testController.expect(this.newDevice[0].type).eql(this.device.type);
    await testController.expect(this.newDevice[0].hdd_capacity).eql(this.device.hdd);
});

cucumber.Then('I validate that new device is displayed in {string} web page', async function (url) {
    await testController.expect(home.elements.devices(this.newDevice[0].id).count).eql(1);
    await testController.expect(home.elements.deviceName(this.newDevice[0].id).visible).eql(true);
    await testController.expect(home.elements.deviceType(this.newDevice[0].id).visible).eql(true);
    await testController.expect(home.elements.deviceHdd(this.newDevice[0].id).visible).eql(true);
});

cucumber.Then('I validate new device information should match with the sent data against the storage location and web page', async function () {
    await testController.expect(home.elements.deviceName(this.newDevice[0].id).innerText).eql(this.newDevice[0].system_name);
    await testController.expect(home.elements.deviceType(this.newDevice[0].id).innerText).eql(this.newDevice[0].type);
    await testController.expect(home.elements.deviceHdd(this.newDevice[0].id).innerText).eql(this.newDevice[0].hdd_capacity + " GB");
});

cucumber.Given('I get the device with name {string} via API {string}', async function (deviceName, apiEndPoint) {
    this.newDevice = await fetch(apiEndPoint)
      .then((response) => response.json())
      .then((data) => data.filter(element =>  element.system_name == deviceName));
});

cucumber.When('I rename the device to {string} via API {string}', async function (newDeviceName, apiEndPoint) {
    await fetch(apiEndPoint.replace("ID", this.newDevice[0].id), { 
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(
        {
          "system_name": newDeviceName,
          "type": this.newDevice[0].type,
          "hdd_capacity": this.newDevice[0].hdd_capacity
        }
      )
    }).then((response) => response.json());
});

cucumber.Then('I validate device name was changed to {string} in web page {string} from API {string}', async function (deviceName, url, apiEndPoint) {
    await testController.navigateTo(url);
    this.newDevice = await fetch(apiEndPoint)
      .then((response) => response.json())
      .then((data) => data.filter(element =>  element.system_name == deviceName));
    await testController.expect(home.elements.deviceName(this.newDevice[0].id).innerText).eql(this.newDevice[0].system_name);
});

cucumber.When('I delete the devia via API {string}', async function (apiEndPoint) {
    await fetch(apiEndPoint.replace("ID", this.newDevice[0].id), { 
        method: "DELETE"
    }).then((response) => response.json());
})

cucumber.Then('I validate device is no longer in web page {string}', async function(url){
    await testController.navigateTo(url);
    await testController.expect(home.elements.deviceInfo(this.newDevice[0].id).exists).notOk();
});
