export const config = {

    runner: 'local',

    // Test Suites - New organized structure
    specs: [
        './test/suites/01-signup-flow/*.e2e.js',
        './test/suites/02-login-flow/*.e2e.js',
        './test/suites/03-google-sso-flow/*.e2e.js',
        './test/suites/04-guest-flow/*.e2e.js'
    ],

    // Suites for running specific test groups
    suites: {
        full: [
            './test/suites/01-signup-flow/*.e2e.js',
            './test/suites/02-login-flow/*.e2e.js',
            './test/suites/03-google-sso-flow/*.e2e.js',
            './test/suites/04-guest-flow/*.e2e.js'
        ],
        signup: ['./test/suites/01-signup-flow/*.e2e.js'],
        login: ['./test/suites/02-login-flow/*.e2e.js'],
        google: ['./test/suites/03-google-sso-flow/*.e2e.js'],
        guest: ['./test/suites/04-guest-flow/*.e2e.js'],
        legacy: ['./test/specs/*.e2e.js']
    },

    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': '055832508I000563',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.techsacare.periodtracker',
        'appium:appActivity': 'com.techsacare.periodtracker.Activity.MainActivity',
        'appium:appWaitActivity': 'com.techsacare.periodtracker.Activity.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': true,
        'appium:dontStopAppOnReset': true,
        'appium:waitForIdleTimeout': 0
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['appium', {
            args: {
                address: 'localhost',
                port: 4723
            },
            logPath: './'
        }]
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 300000
    },

    onPrepare: function () {
        global.testCredentials = {
            email: null,
            password: 'Pass@123',
            googleEmail: null,
            guestName: null
        };
        console.log('Test credentials storage initialized');
    },

    before: async function (capabilities, specs) {
        await driver.setTimeout({ implicit: 0 });

        driver.addCommand('swipeDown', async function () {
            const size = await driver.getWindowSize();
            const startX = Math.floor(size.width / 2);
            const startY = Math.floor(size.height * 0.7);
            const endY = Math.floor(size.height * 0.3);

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 600, origin: 'viewport', x: startX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.pause(500);
        });

        driver.addCommand('swipeUp', async function () {
            const size = await driver.getWindowSize();
            const startX = Math.floor(size.width / 2);
            const startY = Math.floor(size.height * 0.3);
            const endY = Math.floor(size.height * 0.7);

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 600, origin: 'viewport', x: startX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.pause(500);
        });

        driver.addCommand('swipeLeft', async function (selector) {
            let startX, startY, endX;
            let el = selector ? await $(selector) : null;

            if (el && await el.isExisting()) {
                const loc = await el.getLocation();
                const size = await el.getSize();
                startY = loc.y + (size.height / 2);
                startX = loc.x + (size.width * 0.7);
                endX = loc.x + (size.width * 0.5);
            } else {
                const size = await driver.getWindowSize();
                startX = Math.floor(size.width * 0.8);
                startY = Math.floor(size.height / 2);
                endX = Math.floor(size.width * 0.2);
            }

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.floor(startX), y: Math.floor(startY) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 600, origin: 'viewport', x: Math.floor(endX), y: Math.floor(startY) },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.pause(800);
        });
    }
}
