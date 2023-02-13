const {Selector} = require('testcafe');

exports.methods = {
    navigateToUrl:  async function(url) {
        await testController.navigateTo(url);
    }
}
