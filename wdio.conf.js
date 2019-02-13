var path = require('path');

exports.config = {   
    specs: [                
        './test/accTest/sanityTests.js',        
        './test/accTest/glasgowTests.js',        
            
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 1,

    capabilities: [{

        maxInstances: 2,
        
        browserName: 'chrome',
        acceptInsecureCerts: true,
        /*chromeOptions: {
            //args: ['--headless', '--disable-gpu', '--window-size=1920,1080', '--disable-dev-shm-usage', '--no-sandbox']
            args: ['--disable-dev-shm-usage', '--no-sandbox']            
        }*/
    }],

    sync: true,

    logLevel: 'silent',

    coloredLogs: true,

    deprecationWarnings: true,

    bail: 0,

    screenshotPath: './errorShots/',

    baseUrl: 'http://localhost:3000',

    waitforTimeout: 20000,

    connectionRetryTimeout: 90000,

    connectionRetryCount: 3,

    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    // reporters: ['dot'],
    //
    //reporters: ['dot', 'allure'],
    reporters: ['allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true
        }
    },
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 99999999
    },

    beforeTest: function (test) {        
        browser.windowHandleFullscreen(); 
        browser.pause(1000);
        browser.url('/');
        browser.pause(1000);
        browser.waitForExist('h1');
     },
    afterTest: function (test) {
        // try to clear the local storage
        browser.execute('window.localStorage.clear();');        

        //browser.reload();

    },     

}
