Feature: Handling of devices

  I want to create, edit and delete devices from storage location

  Scenario: Validate filter device type
    Given I can navigate to devices web page "http://localhost:3001"
    When I open device type combo box
    Then I get all the different types of devices
    And I validate API from "http://localhost:3000/deviceTypes" device types matches with UI device types

  Scenario: Validate list of devices
    Given I can navigate to devices web page "http://localhost:3001"
    When I get the list of devices from UI
    And I get the list of devices from API "http://localhost:3000/devices"
    Then I validate both lists match and device contains edit and delete buttons

  Scenario: Create new devices in storage location
    Given I can navigate to add device web page "http://localhost:3001/devices/add"
    When I create a new device with name "newDevice" type "WINDOWS SERVER" and hdd "10"
    Then I validate new device "newDevice" is created in API "http://localhost:3000/devices"
    And I validate that new device is displayed in "http://localhost:3001" web page
    And I validate new device information should match with the sent data against the storage location and web page

  Scenario: Rename device
    Given I get the device with name "newDevice" via API "http://localhost:3000/devices"
    When I rename the device to "Rename Device" via API "http://localhost:3000/devices/ID"
    Then I validate device name was changed to "Rename Device" in web page "http://localhost:3001" from API "http://localhost:3000/devices"

  Scenario: Delete device
    Given I get the device with name "Rename Device" via API "http://localhost:3000/devices"
    When I delete the devia via API "http://localhost:3000/devices/ID"
    Then I validate device is no longer in web page "http://localhost:3001"
