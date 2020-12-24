// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { COVERAGE_LIMIT_STATEMENTS, COVERAGE_LIMIT_BRANCHES, COVERAGE_LIMIT_LINES, COVERAGE_LIMIT_FUNCTIONS } = process.env;

const coverageThresholdLimits = {
  statements: COVERAGE_LIMIT_STATEMENTS || 0,
  branches: COVERAGE_LIMIT_BRANCHES || 0,
  lines: COVERAGE_LIMIT_LINES || 0,
  functions: COVERAGE_LIMIT_FUNCTIONS || 0
};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      captureConsole: true,
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage/jb-ui-lib'),
      reports: ['html', 'lcovonly', 'json-summary', 'text-summary'],
      fixWebpackSourcePaths: true,
      thresholds: {
        global: {
          statements: coverageThresholdLimits.statements,
          branches: coverageThresholdLimits.branches,
          lines: coverageThresholdLimits.lines,
          functions: coverageThresholdLimits.functions
        }
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    // browsers: ['Chrome']
    browsers: ['ChromeHeadless']
  });
};
