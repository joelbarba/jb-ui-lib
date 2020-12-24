const {config} = require('./protractor.conf');
const {JUnitXmlReporter} = require('jasmine-reporters');

config.capabilities = {
  'browserName': 'chrome',
  'chromeOptions': {
    args: ['--disable-gpu', '--headless', '--window-size=1920,1080', 'lang=en-IE'],
  },
};

const _onPrepare = config.onPrepare;
config.onPrepare = function () {
  _onPrepare();

  jasmine.getEnv().addReporter(new JUnitXmlReporter({savePath: 'test-results', consolidateAll: false}));
};
exports.config = config;
